import * as React from 'react';
import { useState } from 'react';
import { Row, Col, Card, Input, Button, Select, Empty, List, message, notification } from 'antd';
import omitDeep from 'omit-deep-lodash';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { CustomerData, useFindCustomerMutation, SalesPresentation, useSaveSalesPresentationMutation, useFindItemClassMutation, ItemClassWithDescription, SalesPresentationItemClass } from 'graphql';
import { RouteComponentProps, withRouter } from 'react-router';
import { debounce, findIndex } from 'lodash';
import GetPresentation from './GetPresentation';
import { SalesPresentationContext } from '../../SalesPresentationContext';
const { Option } = Select;

export interface AddEditPresentationProps extends RouteComponentProps<any> {
  presentation?: SalesPresentation;
  form: WrappedFormUtils;
}

const Step1 = (props: AddEditPresentationProps & FormComponentProps<AddEditPresentationProps>) => {
  const context = React.useContext(SalesPresentationContext);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [saving, setSaving] = useState(false);
  const { form, presentation } = props;
  const [itemClasses, setItemClasses] = useState<ItemClassWithDescription[]>(
    props.presentation
      ? props.presentation.itemClasses!.reduce(
          (prev, curr) =>
            prev.concat([
              {
                itemClass: curr.itemClass,
                itemClassDescription: curr.itemClassDescription,
                id: curr.id,
              },
            ]),
          new Array<ItemClassWithDescription>()
        )
      : []
  );
  const [customerSearchNotFound, setCustomerSearchNotFound] = useState('Type to Find a Customer');
  const [, setItemClassNotFound] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Partial<CustomerData>[]>([]);
  const [findCompany] = useFindCustomerMutation();
  const [savePresentation] = useSaveSalesPresentationMutation();
  const [findItemClass] = useFindItemClassMutation();

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    await processSubmit();
  };

  const processSubmit = async (redirect?: string, index: number = 0) => {
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        return false;
      }
      setSaving(true);
      const { customer, itemClass, ...rest } = values;
      if (!itemClasses || itemClasses.length === 0) {
        message.error('Enter at least 1 Item Class');
        return;
      }

      let itemClassesOrdered = omitDeep(itemClasses, ['__typename']);
      // itemClassesOrdered = itemClassesOrdered.map((ic: ItemClassWithDescription, index: number) => {
      //   if (!ic.displayOrder) {
      //     return { ...ic, displayOrder: index };
      //   }
      //   return ic;
      // });

      const result = await savePresentation({
        variables: {
          data: {
            ...rest,
            customerNumber: values.customer.key,
            customerName: values.customer.label,
            itemClasses: itemClassesOrdered,
          },
        },
      });
      if (result && result.data) {
        form.resetFields();
        setSaving(false);
        if (redirect) {
          let itemClass: string = '';
          localStorage.setItem('spid', result.data.saveSalesPresentation.id!.toString());
          switch (redirect) {
            case 'Photos':
              context.id = result.data.saveSalesPresentation.id;
              localStorage.setItem('idx', '0');
              itemClass = itemClasses[0].itemClass;
              localStorage.setItem('spic', itemClass);
              props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, { index: 0, previous: itemClass, itemClass: itemClass });
              break;

            case 'Pricing-Direct':
              console.log('result.data.saveSalesPresentation.itemClasses', JSON.stringify(result.data.saveSalesPresentation.itemClasses, null, 1));
              itemClass = itemClasses[index].itemClass;
              localStorage.setItem('idx', index.toString());
              console.log('itemClass, index', itemClass, index);
              props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, { index, previous: 'Details' });
              break;

            case 'Photo-Direct':
              itemClass = itemClasses[index].itemClass;
              localStorage.setItem('idx', index.toString());
              props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, { index: index, previous: itemClass, itemClass: itemClass });
              break;
          }
        } else {
          context.id = result.data.saveSalesPresentation.id;
          localStorage.setItem('spid', result.data.saveSalesPresentation.id!.toString());
          localStorage.setItem('idx', '0');
          const itemClass = result.data.saveSalesPresentation.itemClasses[0].itemClass;
          localStorage.setItem('spic', itemClass);
          props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, { index: 0, previous: 'Details' });
        }
      }
    });
  };

  const handleGoToPhotos = async () => {
    await processSubmit('Photos');
  };

  const handleSearch = debounce(async (value: string) => {
    if (value) {
      const result = await findCompany({
        variables: { searchText: value },
      });
      if (result && result.data) {
        setCustomerSearchNotFound(result.data.findCustomer.totalRows === 0 ? `'${value}' Not Found - Will Be Added As Entered` : 'Type to Find a Customer');
        setCustomers(result.data.findCustomer.customers);
      }
    } else {
      setCustomers([]);
      setCustomerSearchNotFound('Type to Find a Customer');
    }
  }, 500);

  const handleItemClassSearch = async () => {
    const value = props.form.getFieldValue('itemClass');
    if (value) {
      const result = await findItemClass({
        variables: { searchText: value },
      }).catch(ex => {
        notification['warning']({
          message: 'Item Class Search',
          description: `Item Class "${value}" Not Found.`,
          duration: 5,
        });
      });
      if (result && result.data) {
        if (result.data.findItemClass === undefined) {
          setItemClassNotFound(`'${value}' Not Found`);
        }
        setItemClasses([...itemClasses, result.data.findItemClass]);
        setHasChanges(true);
      }
    } else {
      setItemClasses([]);
      setItemClassNotFound(null);
    }
  };

  const handleChange = (value: any) => {
    console.log('handleChange', value);
  };

  const remove = (item: string) => {
    const index = findIndex(itemClasses, ic => ic.itemClass === item);
    if (index >= 0) {
      itemClasses.splice(index, 1);
      setItemClasses([...itemClasses]);
      setHasChanges(true);
    }
  };

  const goPricing = async (item: string, index: number) => {
    console.log('index, item', index, item);
    await processSubmit('Pricing-Direct', index);
  };

  const goPhotos = async (item: string, index: number) => {
    await processSubmit('Photo-Direct', index);
  };

  const isNew = (item: ItemClassWithDescription) => {
    if (!presentation || !presentation.id) return true;
    const index = findIndex(presentation!.itemClasses, (ic: SalesPresentationItemClass) => ic.itemClass === item.itemClass);
    return index < 0;
  };

  const itemClassActions = (item, index) => {
    const buttons: any[] = [];
    buttons.push(
      <Button type="primary" size="small" onClick={async () => await goPricing(item.itemClass, index)} key={item.itemClass}>
        Go Pricing
      </Button>
    );
    buttons.push(
      <Button type="primary" size="small" onClick={async () => await goPhotos(item.itemClass, index)} key={item.itemClass}>
        Go Photos
      </Button>
    );
    buttons.push(
      <Button type="danger" size="small" onClick={() => remove(item.itemClass)} key={item.itemClass}>
        Remove
      </Button>
    );

    return buttons;
  };
  const options = customers.map(c => <Option key={`${c.Customer_Number!}|${c.Customer_Name!}`}>{c.Customer_Name!}</Option>);
  return (
    <div style={{ padding: 20 }}>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Row gutter={10} type="flex">
          <Col xs={24} sm={12} style={{ display: 'flex' }}>
            <Card title="Presentation Information" size="small" style={{ flex: 1, fontWeight: 700, width: '100%' }}>
              <Row type="flex" gutter={20}>
                <Col xs={24}>
                  {form.getFieldDecorator('id', {
                    initialValue: presentation ? presentation!.id : undefined,
                  })(<Input placeholder="id" type="hidden" />)}

                  <FormItem label="Name for the Sales Presentation">
                    {form.getFieldDecorator('name', {
                      initialValue: presentation ? presentation!.name : '',
                      rules: [
                        {
                          required: true,
                          message: 'Enter Name for Sales Presentation',
                        },
                      ],
                    })(<Input style={{ width: '100%' }} />)}
                  </FormItem>

                  <FormItem label="Enter Customer Name or Customer Number">
                    {form.getFieldDecorator('customer', {
                      initialValue: presentation
                        ? {
                            key: presentation!.customerNumber,
                            label: presentation!.customerName,
                          }
                        : '',
                      rules: [
                        {
                          required: true,
                          message: 'Enter Customer Name or Customer Number',
                        },
                      ],
                    })(
                      <Select
                        showSearch
                        mode="combobox"
                        allowClear={true}
                        placeholder={'Enter Customer Name or Customer Number'}
                        labelInValue={true}
                        // defaultActiveFirstOption={false}
                        // showArrow={false}
                        // filterOption={false}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        notFoundContent={customerSearchNotFound}
                      >
                        {options}
                      </Select>
                    )}
                  </FormItem>

                  <FormItem label="Select Price Level(s)">
                    {form.getFieldDecorator('priceLevels', {
                      initialValue: presentation ? presentation.priceLevels.reduce((p, c) => p.concat([{ key: c.priceLevel, label: c.displayName }]), new Array<{ key: string; label: string }>()) : [],
                      rules: [{ required: true, message: 'Select Price Level' }],
                    })(
                      <Select placeholder={'Select Price Level'} mode="multiple" labelInValue>
                        <Option key={'DROPSHIP'}>Dropship</Option>
                        <Option key={'DROPSHIP_M'}>Dropship M</Option>
                        <Option key={'DROPSHIP_X'}>Dropship X</Option>
                        <Option key={'FOB'}>FOB</Option>
                        <Option key={'FOB_M'}>FOB M</Option>
                        <Option key={'LEVEL0'}>LEVEL 0</Option>
                        <Option key={'LEVEL1'}>LEVEL 1</Option>
                        <Option key={'LEVEL2'}>LEVEL 2</Option>
                        <Option key={'LEVEL3'}>LEVEL 3</Option>
                        <Option key={'MIX_FULL'}>MIX FULL</Option>
                        <Option key={'MIX_HALF'}>MIX HALF</Option>
                        <Option key={'MIX_QTR'}>MIX QTR</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12} style={{ display: 'flex' }}>
            <Card title="Item Classes" size="small" style={{ flex: 1, fontWeight: 700, width: '100%' }}>
              <Row type="flex" gutter={20}>
                <Col style={{ flex: 1 }}>
                  {form.getFieldDecorator('itemClass', {
                    initialValue: '',
                  })(<Input placeholder={'Enter Item Class'} style={{ width: '100%' }} />)}
                </Col>
                <Col>
                  <Button type="primary" onClick={handleItemClassSearch}>
                    Add Item Class
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: '20px 0',
                    }}
                  >
                    Item Classes Selected
                  </div>
                  {itemClasses.length === 0 ? (
                    <Empty />
                  ) : (
                    <List
                      size="small"
                      bordered
                      dataSource={itemClasses}
                      renderItem={(item, index) => (
                        <List.Item actions={itemClassActions(item, index)}>
                          <List.Item.Meta
                            description={
                              <div>
                                {item.itemClass} : {item.itemClassDescription}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24} style={{ marginTop: 20 }}>
            <Button htmlType="submit" type="primary" loading={saving} block>
              Save Sales Presentation and Move Next
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create<AddEditPresentationProps>()(withRouter(GetPresentation(Step1 as any)));
