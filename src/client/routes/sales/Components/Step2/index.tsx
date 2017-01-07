import * as React from 'react';
import { useState } from 'react';
import { Row, Col, Input, Button, Empty, InputNumber, notification, Collapse, Select, Anchor, Icon, Divider } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { RouteComponentProps, withRouter } from 'react-router';
import { some, findIndex } from 'lodash';
import omitDeep from 'omit-deep-lodash';
import './index.scss';
import { KitItemsResult, ItemKitDetail, useFindItemNumberMutation, useFindKitItemsMutation, useSaveStep2Mutation, SalesPresentationItemClassItemNumber, SalesPresentationAndRelated, useFindGroupItemMutation } from 'graphql';
import FormItem from 'antd/lib/form/FormItem';
import KitItemGroup from './Components/KitItemGroup';
import IndividualItems from './Components/IndividualItems';
import GetPresentation from './GetPresentation';
import ItemMasterGroups from './Components/ItemMasterGroups';
import { DragDropContext } from 'react-beautiful-dnd';
import { SalesPresentationContext } from '../../SalesPresentationContext';
const { Panel } = Collapse;
const { Option } = Select;

export interface AddEditPresentationProps extends RouteComponentProps<any> {
  presentation?: SalesPresentationAndRelated;
  form: WrappedFormUtils;
  kits?: KitItemsResult[];
  groups?: ItemKitDetail[];
}

// export type KitItem = {
//   kitItem: string;
//   kitItems: Partial<ItemKitDetail>[];
// };

const Step2 = (props: AddEditPresentationProps & FormComponentProps<AddEditPresentationProps>) => {
  const presentationContext = React.useContext(SalesPresentationContext);
  const { form, presentation: pData } = props;

  const { presentation, presentationItemClass, presentationItemClassGroups, presentationItemClassItemNumbers, presentationItemClassKits, groups: lfiGroups, kits: lfiKits, itemNumbers: lfiItemNumbers, itemClassIndex, anyUnsavedItemClasses } = pData!;

  const itemClass = presentationItemClass;
  let currentIndex = itemClassIndex;

  const [priceLevels] = useState<string[]>(presentation && presentation.priceLevels ? presentation.priceLevels.reduce((c, p) => c.concat(p.priceLevel), new Array<string>()) : []);
  // console.log('isEdit', isEdit);
  const [itemNumbers, setItemNumbers] = useState<Partial<SalesPresentationItemClassItemNumber>[]>(omitDeep(presentationItemClassItemNumbers, ['__typename']));
  const [kitItems, setKitItems] = useState<any[]>(omitDeep(presentationItemClassKits!, ['__typename']));
  const [groups, setGroups] = useState<any[]>(omitDeep(presentationItemClassGroups!, ['__typename']));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [priceAdjustPercent, setPriceAdjustPercent] = useState(presentationItemClass ? presentationItemClass.priceAdjustment : 0);
  const [priceAdjustPercentTo, setPriceAdjustPercentTo] = useState(presentationItemClass ? presentationItemClass.priceAdjustmentTo : 'All');
  const [cubeAdjustment, setCubeAdjustment] = useState(presentationItemClass ? presentationItemClass.cubeAdjustment : 0);
  const [cubeAdjustmentTo, setCubeAdjustmentTo] = useState(presentationItemClass ? presentationItemClass.cubeAdjustmentTo : 'All');

  const [adjustPricing, setAdjustPricing] = useState('None');
  const [savingItemClass, setSavingItemClass] = useState(false);

  const [findItemNumber, { loading: itemLoading }] = useFindItemNumberMutation();
  const [findKitItems, { loading: kitLoading }] = useFindKitItemsMutation();
  const [findGroupItem, { loading: groupLoading }] = useFindGroupItemMutation();
  const [saveStep2] = useSaveStep2Mutation();

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    await processSubmit();
  };

  const processSubmit = async (redirect?: string, index: number = 0) => {
    setSavingItemClass(true);
    form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (err) {
        setSavingItemClass(false);
        return null;
      }

      const { searchKitItem, searchItemNumber, searchMasterGroupNumber, ...rest } = values;
      const data = {
        salesPresentationId: presentation.id!,
        itemClassId: itemClass.id,
        itemClass: itemClass.itemClass,
        ...rest,
      };

      if (data.kits) priceLevels.forEach(pl => data.kits.forEach(kit => kit.kitItems.forEach(item => (item[pl] = Number(item[pl])))));
      if (data.groups) priceLevels.forEach(pl => data.groups.forEach(group => (group[pl] = Number(group[pl]))));
      if (data.items) priceLevels.forEach(pl => data.items.forEach(item => (item[pl] = Number(item[pl]))));

      const result = await saveStep2({
        variables: {
          data,
        },
      }).catch(ex => {
        console.log('error:', ex.message);
        setSavingItemClass(false);
      });

      if (result && result.data) {
        form.resetFields();
        setSavingItemClass(false);
        if (result.data.saveStep2) {
          if (redirect) {
            let itemClass: string = '';
            localStorage.setItem('spid', result.data.saveStep2.id!.toString());
            switch (redirect) {
              case 'Details':
                props.history.push(`/sales-presentations/wizard/step-1`);
                break;

              case 'Preview':
                props.history.push(`/sales-presentations/wizard/step-4`);
                break;

              case 'Previous':
                presentationContext.id = result.data.saveStep2.id;
                if (index >= 0 && index < presentation.itemClasses.length) {
                  itemClass = presentation.itemClasses[index].itemClass;
                  localStorage.setItem('idx', index.toString());
                  props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, { index });
                } else {
                  props.history.push(`/sales-presentations/wizard/step-1`);
                }
                break;

              case 'Pricing-Direct':
                itemClass = presentation.itemClasses[index].itemClass;
                localStorage.setItem('idx', index.toString());
                props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, { index });
                break;

              case 'Photos':
                itemClass = presentation.itemClasses[index].itemClass;
                localStorage.setItem('idx', index.toString());
                props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, { index });
                break;
            }
          } else {
            localStorage.setItem('spid', presentation.id!.toString());
            if (currentIndex + 1 >= presentation.itemClasses.length) {
              localStorage.setItem('idx', '0');
              const itemClass = presentation.itemClasses[0].itemClass;
              props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, { index: 0 });
            } else {
              localStorage.setItem('idx', `${currentIndex + 1}`);
              const itemClass = presentation.itemClasses[currentIndex + 1].itemClass;
              props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, { index: currentIndex + 1 });
            }
          }
          // setItems([]);
          // setCurrentIndex(currentIndex + 1);
          // localStorage.setItem('idx', (currentIndex + 1).toString());
        }
        // props.history.push('/sales-presentations/wizard/step-2');
      }
      setSavingItemClass(false);
    });
  };

  const handleItemNumberSearch = async () => {
    const searchText = props.form.getFieldValue(`searchItemNumber`);
    const result = await findItemNumber({
      variables: { itemClass: itemClass.itemClass, searchText },
    }).catch(() => {
      notification['warning']({
        message: 'Individual Item Search',
        description: `Item "${searchText}" Not Found in Item Class ${itemClass.itemClass}`,
        duration: 5,
      });
    });

    if (result && result.data) {
      setItemNumbers([...itemNumbers, result.data.findItemNumber]);
      notification['warning']({
        message: 'Individual Item Search',
        description: `Item "${searchText}" was Added Successfully at End of List.`,
        duration: 5,
      });
    }
    // form.setFieldsValue({ searchItemNumber: '' });
  };

  const handleKitItemSearch = async () => {
    const searchText = props.form.getFieldValue(`searchKitItem`);
    const result = await findKitItems({
      variables: { searchText, itemClass: itemClass.itemClass },
    }).catch(ex => {
      notification['warning']({
        message: 'Kit Item Search',
        description: `Kit "${searchText}" Not Found in Item Class ${itemClass.itemClass}`,
        duration: 5,
      });
    });
    if (result && result.data) {
      if (result.data.findKitItems.length === 0) {
        notification['warning']({
          message: 'Kit Item Search',
          description: `Kit "${searchText}" Not Found in Item Class ${itemClass.itemClass}`,
          duration: 5,
        });
      } else {
        setKitItems([...kitItems, { kitItem: searchText, kitItems: result.data.findKitItems }]);
        notification['warning']({
          message: 'Kit Item Search',
          description: `Kit "${searchText}" was Added Successfully at End of List.`,
          duration: 5,
        });
      }
      // form.setFieldsValue({ searchKitItem: '' });
    }
  };

  const removeAllKits = () => {
    setKitItems([]);
  };

  const removeAllItemNumbers = () => {
    setItemNumbers([]);
  };

  const removeAllGroups = () => {
    setGroups([]);
  };

  const handleGroupItemSearch = async () => {
    const searchText = props.form.getFieldValue(`searchMasterGroupNumber`);
    const result = await findGroupItem({
      variables: { searchText, itemClass: itemClass.itemClass },
    }).catch(ex => {
      notification['warning']({
        message: 'Group Item Search',
        description: `Group "${searchText}" Not Found in Item Class ${itemClass.itemClass}`,
        duration: 5,
      });
    });
    if (result && result.data) {
      if (result && result.data) {
        setGroups([...groups, result.data.findGroupItem]);
        notification['success']({
          message: 'Group Item Search',
          description: `Group "${searchText}" was Added Successfully at End of List.`,
          duration: 5,
        });
      }
      // form.setFieldsValue({ searchMasterGroupNumber: '' });
    }
  };

  const hasPriceLevel = (priceLevel: string) => {
    return some(presentation.priceLevels, { priceLevel });
  };

  const removeItem = (e: any, itemNumber: string) => {
    e.preventDefault();
    const index = findIndex(itemNumbers, item => item.itemNumber === itemNumber);
    if (index >= 0) {
      itemNumbers.splice(index, 1);
      setItemNumbers([...itemNumbers]);
    }
  };

  const removeKit = (e: any, kitItem: string) => {
    e.preventDefault();
    const kitIndex = findIndex(kitItems, kit => kit.kitItem === kitItem);
    if (kitIndex >= 0) {
      kitItems!.splice(kitIndex, 1);
      setKitItems([...kitItems!]);
    }
  };

  const removeGroup = (e: any, kitItem: string) => {
    e.preventDefault();
    const groupIndex = findIndex(groups, group => group.kitItem === kitItem);
    if (groupIndex >= 0) {
      groups!.splice(groupIndex, 1);
      setGroups([...groups]);
    }
  };

  const onPricingAdjustmentChange = (type: string) => {
    setPriceAdjustPercent(0);
    setCubeAdjustment(0);
    setAdjustPricing(type);
  };

  const navigateBack = async () => {
    await processSubmit('Previous', currentIndex - 1);
    // if (currentIndex - 1 < 0) {
    //   props.history.push(`/sales-presentations/wizard/step-1`);
    // } else {
    //   await
    //   const index = props.location.state.index - 1;
    //   localStorage.setItem('idx', `${index}`);
    //   const itemClass = presentation.itemClasses[index].itemClass;
    //   localStorage.setItem('spic', itemClass);
    //   props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, {
    //     index: index,
    //     previous: itemClass,
    //     next: presentation.itemClasses[currentIndex].itemClass,
    //   });
    // }
  };

  // const navigatePhotos = () => {
  //   localStorage.setItem('spid', presentation!.id!.toString());
  //   localStorage.setItem('idx', '0');
  //   const itemClass = presentation!.itemClasses[0].itemClass;
  //   localStorage.setItem('spic', itemClass);
  //   props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, {
  //     index: 0,
  //     previous: itemClass,
  //   });
  // };

  // const navigateForward = () => {
  //   if (currentIndex + 1 >= presentation!.itemClasses.length) {
  //     props.history.push(`/sales-presentations/wizard/step-3/${presentation!.itemClasses[0].itemClass}`, {
  //       index: 0,
  //       previous: itemClass.itemClass,
  //     });
  //   } else {
  //     localStorage.setItem('idx', `${currentIndex + 1}`);
  //     const itemClass = presentation!.itemClasses[currentIndex + 1].itemClass;
  //     localStorage.setItem('spic', itemClass);
  //     props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, {
  //       index: currentIndex + 1,
  //       previous: 'Pricing',
  //       next: presentation!.itemClasses[currentIndex + 1].itemClass,
  //     });
  //   }
  // };

  const getNextUrlText = () => {
    if (currentIndex + 1 >= presentation!.itemClasses.length) {
      return 'Photos';
    } else {
      return presentation!.itemClasses[currentIndex + 1].itemClass;
    }
  };

  const getPreviousUrlText = () => {
    if (currentIndex - 1 < 0) {
      return 'Details';
    } else {
      return presentation!.itemClasses[currentIndex - 1].itemClass;
    }
  };

  const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    for (let i = 0; i < result.length; i++) {
      result[i].displayOrder = i;
    }
    return result;
  };

  const onKitDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      setKitItems(reorder(kitItems, source.index, destination.index));
    }
  };

  const onItemNumberDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      setItemNumbers(reorder(itemNumbers, source.index, destination.index));
    }
  };

  const onGroupDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      setGroups(reorder(groups, source.index, destination.index));
    }
  };

  const jumpTo = async (id: number) => {
    if (id === -1) {
      await processSubmit('Details');
    } else if (id === -2) {
      await processSubmit('Photos', 0);
    } else if (id === -3) {
      await processSubmit('Preview');
    } else {
      let index = findIndex(presentation.itemClasses, ic => ic.id === id);
      if (index < 0) index = 0;
      if (index > presentation.itemClasses.length) index = presentation.itemClasses.length - 1;
      console.log('index', index);
      await processSubmit('Pricing-Direct', index);

      // if (id < 0) {
      //   localStorage.setItem('idx', `${0}`);
      //   const itemClass = presentation!.itemClasses[0].itemClass;
      //   localStorage.setItem('spic', itemClass);
      //   props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, {
      //     index: 0,
      //     previous: 'Pricing',
      //     next: '',
      //   });
      // } else {
      //   const index = findIndex(presentation.itemClasses, ic => ic.id === id);
      //   localStorage.setItem('idx', `${index}`);
      //   const itemClass = presentation!.itemClasses[index].itemClass;
      //   localStorage.setItem('spic', itemClass);
      //   props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, {
      //     index: index,
      //     previous: index - 1 >= 0 ? presentation!.itemClasses[index - 1].itemClass : 'Details',
      //     next: index + 1 < presentation!.itemClasses.length ? presentation!.itemClasses[index + 1].itemClass : 'Photos',
      //   });
      // }
    }
  };

  // const options = data && data!.findItemClass ? <Option key={data.findItemClass!.itemClass}>{data.findItemClass!.itemClass}</Option> : null;
  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <Anchor style={{ borderBottom: 'solid 1px #383c4f' }}>
        <Row>
          <Col
            style={{
              fontSize: '30px',
              padding: '10px 0 0 0',
              color: 'black',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Pricing for Item Class: {itemClass.itemClass}
          </Col>
        </Row>
        <Row
          type="flex"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px 20px 20px 20px',
          }}
        >
          <Col style={{ flex: 1 }}>
            <Row type="flex" gutter={5}>
              <Col>
                <div>Item Pricing</div>
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(`priceAdjustment`, {
                    initialValue: priceAdjustPercent,
                  })(<InputNumber placeholder={'Price Adjustment'} formatter={value => `${value}%`} parser={value => value!.replace('%', '')} style={{ width: '85px' }} onChange={e => setPriceAdjustPercent(e ? e : 0)} />)}
                </FormItem>
              </Col>
              <Col style={{ paddingRight: 25 }}>
                <div>Pricing Change To</div>
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(`priceAdjustmentTo`, {
                    initialValue: priceAdjustPercentTo,
                  })(
                    <Select style={{ width: '125px' }} placeholder={'Select One'} onSelect={e => setPriceAdjustPercentTo(e as string)}>
                      <Option key={'All'}>All</Option>
                      {hasPriceLevel('DROPSHIP') && <Option key={'DROPSHIP'}>Dropship</Option>}
                      {hasPriceLevel('DROPSHIP_M') && <Option key={'DROPSHIP_M'}>Dropship M</Option>}
                      {hasPriceLevel('DROPSHIP_X') && <Option key={'DROPSHIP_X'}>Dropship X</Option>}
                      {hasPriceLevel('FOB') && <Option key={'FOB'}>FOB</Option>}
                      {hasPriceLevel('FOB_M') && <Option key={'FOB_M'}>FOB M</Option>}
                      {hasPriceLevel('LEVEL0') && <Option key={'LEVEL0'}>LEVEL 0</Option>}
                      {hasPriceLevel('LEVEL1') && <Option key={'LEVEL1'}>LEVEL 1</Option>}
                      {hasPriceLevel('LEVEL2') && <Option key={'LEVEL2'}>LEVEL 2</Option>}
                      {hasPriceLevel('LEVEL3') && <Option key={'LEVEL3'}>LEVEL 3</Option>}
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col>
                <div>Cube Pricing</div>
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(`cubeAdjustment`, {
                    initialValue: cubeAdjustment,
                  })(<InputNumber placeholder={'Cube Adjustment'} style={{ width: '85px' }} formatter={value => `$${value}`} parser={value => value!.replace('$', '')} onChange={e => setCubeAdjustment(e ? e : 0)} />)}
                </FormItem>
              </Col>
              <Col>
                <div>Pricing Change To</div>
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(`cubeAdjustmentTo`, {
                    initialValue: 'All',
                  })(
                    <Select style={{ width: '125px' }} placeholder={'Select One'} onSelect={e => setCubeAdjustmentTo(e as string)}>
                      <Option key={'All'}>All</Option>
                      {hasPriceLevel('DROPSHIP') && <Option key={'DROPSHIP'}>Dropship</Option>}
                      {hasPriceLevel('DROPSHIP_M') && <Option key={'DROPSHIP_M'}>Dropship M</Option>}
                      {hasPriceLevel('DROPSHIP_X') && <Option key={'DROPSHIP_X'}>Dropship X</Option>}
                      {hasPriceLevel('FOB') && <Option key={'FOB'}>FOB</Option>}
                      {hasPriceLevel('FOB_M') && <Option key={'FOB_M'}>FOB M</Option>}
                      {hasPriceLevel('LEVEL0') && <Option key={'LEVEL0'}>LEVEL 0</Option>}
                      {hasPriceLevel('LEVEL1') && <Option key={'LEVEL1'}>LEVEL 1</Option>}
                      {hasPriceLevel('LEVEL2') && <Option key={'LEVEL2'}>LEVEL 2</Option>}
                      {hasPriceLevel('LEVEL3') && <Option key={'LEVEL3'}>LEVEL 3</Option>}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col style={{ flex: 10, paddingTop: 15, textAlign: 'right' }}>
                <Button className="header-button" icon="caret-left" onClick={navigateBack}>
                  Go To {getPreviousUrlText()}
                </Button>
                <Select defaultValue={presentation.itemClasses[currentIndex].id} onChange={e => jumpTo(e)} style={{ maxWidth: 150 }}>
                  <Select.Option key="Details" value={-1}>
                    Jump To Details
                  </Select.Option>
                  {presentation.itemClasses.map(ic => (
                    <Select.Option key={ic.id} value={ic.id}>
                      Jump To {ic.itemClass}
                    </Select.Option>
                  ))}
                  <Select.Option key="Photos" value={-2}>
                    Jump To Photos
                  </Select.Option>
                  <Select.Option key="Preview" value={-3}>
                    Jump To Preview
                  </Select.Option>
                </Select>
                <Button htmlType="submit" type="primary" loading={savingItemClass} className="header-button" icon="caret-right">
                  <span>
                    {savingItemClass ? (
                      <>&nbsp;Saving {presentationItemClass.itemClass}...</>
                    ) : (
                      <>
                        Go To <>{getNextUrlText()}</>
                      </>
                    )}
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row type="flex" gutter={10} style={{ alignItems: 'center', margin: '0 30px 15px 30px' }}>
          <Col style={{ flex: 2, fontWeight: 700 }}>Item</Col>
          <Col style={{ flex: 4, fontWeight: 700 }}>Description</Col>
          {hasPriceLevel('DROPSHIP') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`DROPSHIP`, {
                  initialValue: itemClass.DROPSHIP ? itemClass.DROPSHIP : 'DROPSHIP',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('DROPSHIP_M') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`DROPSHIP_M`, {
                  initialValue: itemClass.DROPSHIP_M ? itemClass.DROPSHIP_M : 'DROPSHIP_M',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('DROPSHIP_X') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`DROPSHIP_X`, {
                  initialValue: itemClass.DROPSHIP_X ? itemClass.DROPSHIP_X : 'DROPSHIP_X',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('FOB') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`FOB`, {
                  initialValue: itemClass.FOB ? itemClass.FOB : 'FOB',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('FOB_M') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`FOB_M`, {
                  initialValue: itemClass.FOB_M ? itemClass.FOB_M : 'FOB_M',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('LEVEL0') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`LEVEL0`, {
                  initialValue: itemClass.LEVEL0 ? itemClass.LEVEL0 : 'LEVEL0',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('LEVEL1') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`LEVEL1`, {
                  initialValue: itemClass.LEVEL1 ? itemClass.LEVEL1 : 'LEVEL1',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('LEVEL2') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`LEVEL2`, {
                  initialValue: itemClass.LEVEL2 ? itemClass.LEVEL2 : 'LEVEL2',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('LEVEL3') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`LEVEL3`, {
                  initialValue: itemClass.LEVEL3 ? itemClass.LEVEL3 : 'LEVEL3',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('MIX_FULL') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`MIX_FULL`, {
                  initialValue: itemClass.MIX_FULL ? itemClass.MIX_FULL : 'MIX_FULL',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('MIX_HALF') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`MIX_HALF`, {
                  initialValue: itemClass.MIX_HALF ? itemClass.MIX_HALF : 'MIX_HALF',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
          {hasPriceLevel('MIX_QTR') && (
            <Col style={{ flex: 1 }}>
              <FormItem hasFeedback style={{ margin: 0 }}>
                {form.getFieldDecorator(`MIX_QTR`, {
                  initialValue: itemClass.MIX_QTR ? itemClass.MIX_QTR : 'MIX_QTR',
                  rules: [{ required: true, message: 'Required' }],
                })(<Input size="small" style={{ fontWeight: 700 }} />)}
              </FormItem>
            </Col>
          )}
        </Row>
      </Anchor>
      <Row gutter={10} type="flex">
        <Col style={{ flex: 1 }}>
          <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
            <Panel header="Kit Items" key="1" style={{ fontWeight: 700, marginBottom: 'solid 1px #ccc' }}>
              <Row type="flex" style={{ alignItems: 'center' }} gutter={20}>
                <Col style={{ flex: 1, maxWidth: '145px', fontWeight: 700 }}>Enter Kit Number</Col>
                <Col style={{ flex: 3 }}>
                  {form.getFieldDecorator(`searchKitItem`, {
                    initialValue: '',
                    trigger: 'onBlur',
                    valuePropName: 'defaultValue',
                  })(
                    <Input
                      // onBlur={e => {
                      //   e.preventDefault();
                      //   e.target.blur();
                      // }}
                      // onChange={e => {
                      //   e.preventDefault();
                      //   console.log('onChange');
                      // }}
                      placeholder={'Enter Kit Number'}
                      style={{ width: '100%' }}
                    />
                  )}
                </Col>
                <Col style={{ display: 'flex' }}>
                  <Button type="primary" style={{ width: 150 }} loading={kitLoading} onClick={handleKitItemSearch}>
                    <span>{kitLoading ? <>&nbsp;Loading...</> : <>Add Kit Number</>}</span>
                  </Button>
                  <Button disabled={kitItems.length === 0} type="danger" style={{ width: 150, marginLeft: 10 }} onClick={removeAllKits}>
                    <span>Remove All</span>
                  </Button>
                </Col>
              </Row>

              <Row type="flex" gutter={20}>
                <Col style={{ flex: 1, margin: '20px 10px' }}>
                  {kitItems!.length === 0 ? (
                    <Empty description="No Kits Added" />
                  ) : (
                    <DragDropContext onDragEnd={onKitDragEnd}>
                      <KitItemGroup
                        form={form}
                        hasPriceLevel={hasPriceLevel}
                        kitItems={kitItems!}
                        removeKit={removeKit}
                        priceAdjustPercent={priceAdjustPercent}
                        priceAdjustPercentTo={priceAdjustPercentTo}
                        cubeAdjust={cubeAdjustment}
                        cubeAdjustTo={cubeAdjustmentTo}
                        priceLevels={priceLevels}
                        itemClass={presentationItemClass}
                      />
                    </DragDropContext>
                  )}
                </Col>
              </Row>
            </Panel>
            <Panel header="Individual Items" key="2">
              <Row type="flex" style={{ alignItems: 'center' }} gutter={20}>
                <Col style={{ flex: 1, maxWidth: '160px', fontWeight: 700 }}>Enter Item Number</Col>
                <Col style={{ flex: 3 }}>
                  {form.getFieldDecorator(`searchItemNumber`, {
                    initialValue: '',
                    trigger: 'onBlur',
                    valuePropName: 'defaultValue',
                  })(
                    <Input
                      onBlur={e => {
                        e.preventDefault();
                        e.target.blur();
                      }}
                      onChange={e => {
                        e.preventDefault();
                      }}
                      placeholder={'Enter Item Number'}
                      style={{ width: '100%' }}
                    />
                  )}
                </Col>
                <Col style={{ display: 'flex' }}>
                  <Button type="primary" style={{ width: 150 }} loading={itemLoading} onClick={handleItemNumberSearch}>
                    <span>{itemLoading ? <>&nbsp;Loading...</> : <>Add Item Number</>}</span>
                  </Button>
                  <Button disabled={itemNumbers.length === 0} type="danger" style={{ width: 150, marginLeft: 10 }} onClick={removeAllItemNumbers}>
                    <span>Remove All</span>
                  </Button>
                </Col>
              </Row>

              <div>
                <Row type="flex" gutter={20}>
                  <Col style={{ flex: 1, margin: '20px' }}>
                    {itemNumbers.length === 0 ? (
                      <Empty description="No Individual Items Added" />
                    ) : (
                      <DragDropContext onDragEnd={onItemNumberDragEnd}>
                        <IndividualItems
                          items={itemNumbers}
                          removeItem={removeItem}
                          form={form}
                          hasPriceLevel={hasPriceLevel}
                          priceAdjustPercent={priceAdjustPercent}
                          priceAdjustPercentTo={priceAdjustPercentTo}
                          cubeAdjust={cubeAdjustment}
                          cubeAdjustTo={cubeAdjustmentTo}
                          priceLevels={priceLevels}
                          itemClass={presentationItemClass}
                        />
                      </DragDropContext>
                    )}
                  </Col>
                </Row>
              </div>
            </Panel>

            <Panel header="Master Group Items" key="3">
              <Row type="flex" style={{ alignItems: 'center' }} gutter={20}>
                <Col style={{ flex: 1, maxWidth: '220px', fontWeight: 700 }}>Enter Master Group Number</Col>
                <Col style={{ flex: 3 }}>
                  {form.getFieldDecorator(`searchMasterGroupNumber`, {
                    initialValue: '',
                    trigger: 'onBlur',
                    valuePropName: 'defaultValue',
                  })(
                    <Input
                      onBlur={e => {
                        e.preventDefault();
                        e.target.blur();
                      }}
                      onChange={e => {
                        e.preventDefault();
                      }}
                      placeholder={'Enter Master Group Number'}
                      style={{ width: '100%' }}
                    />
                  )}
                </Col>
                <Col style={{ display: 'flex' }}>
                  <Button type="primary" style={{ width: 150 }} loading={groupLoading} onClick={handleGroupItemSearch}>
                    <span>{groupLoading ? <>&nbsp;Loading...</> : <>Add Master Group</>}</span>
                  </Button>{' '}
                  <Button disabled={groups.length === 0} type="danger" style={{ width: 150, marginLeft: 10 }} onClick={removeAllGroups}>
                    <span>Remove All</span>
                  </Button>
                </Col>
              </Row>

              <div>
                <Row type="flex" gutter={20}>
                  <Col style={{ flex: 1, margin: '20px' }}>
                    {groups && groups.length === 0 ? (
                      <Empty description="No Master Groups Added" />
                    ) : (
                      <DragDropContext onDragEnd={onGroupDragEnd}>
                        <ItemMasterGroups
                          groups={groups}
                          removeItem={removeGroup}
                          form={form}
                          hasPriceLevel={hasPriceLevel}
                          priceAdjustPercent={priceAdjustPercent}
                          priceAdjustPercentTo={priceAdjustPercentTo}
                          cubeAdjust={cubeAdjustment}
                          cubeAdjustTo={cubeAdjustmentTo}
                          priceLevels={priceLevels}
                          itemClass={presentationItemClass}
                        />
                      </DragDropContext>
                    )}
                  </Col>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      {/* <Row type="flex" gutter={{ xs: 5, sm: 10, md: 15, lg: 20 }} style={{ padding: 20 }}>
        <Col style={{ minWidth: 125, flex: 1, margin: '5px 0' }}>
          <Button htmlType="submit" type="primary" block onClick={() => props.history.push('/sales-presentations/wizard/step-1')}>
            Previous
          </Button>
        </Col>
        <Col style={{ flex: 5, margin: '5px 0' }}>
          <Button htmlType="submit" type="primary" block loading={savingItemClass}>
            Save Item Numbers and Move Next
          </Button>
        </Col>
      </Row> */}
    </Form>
  );
};

export default Form.create<AddEditPresentationProps>()(GetPresentation<AddEditPresentationProps>(withRouter<AddEditPresentationProps, any>(Step2)));
