import * as React from 'react';
import { Form, Row, Col, Input, Icon, Button, InputNumber, Tabs } from 'antd';
import GraphQLError from '../../GraphQLError';
import FormItem from 'antd/lib/form/FormItem';
import { withRouter, RouteComponentProps } from 'react-router';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import GetVendor from './GetVendor';
import { IVendor } from 'client/interfaces/vendor';
import { CategoryItemClassGrouped, useSaveVendorMutation, VendorInput } from 'graphql';
import { find } from 'lodash';
import ItemClassCollection from '@/components/ItemClassCollection';
import { VendorContext } from '@/routes/corporate/Vendors/VendorContext';

export const vendorCategories = [
  { label: 'Bedroom', value: 'BR' },
  { label: 'Dining', value: 'CD' },
  { label: 'Entertainment', value: 'ENT' },
  { label: 'Home Office', value: 'HO' },
  { label: 'Occasional', value: 'OT' },
  { label: 'Youth', value: 'YBR' },
  { label: 'Home Accents', value: 'AC' },
];
export interface SaveVendorResponse {
  saveVendor: {
    Id: string;
    Name: string;
    Logo: string;
  };
}

export interface SaveVendorVariables {
  data: IVendor;
}

export interface AddEditVendorProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  vendor?: IVendor;
  itemClasses: CategoryItemClassGrouped;
}

const AddEditVendor = function(props: AddEditVendorProps & RouteComponentProps<any>) {
  const [saveError, setSaveError] = React.useState<string | undefined>(undefined);
  const vendorContext = React.useContext(VendorContext);
  const [saveVendor] = useSaveVendorMutation();
  const {
    form: { getFieldDecorator },
    vendor,
  } = props;

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: VendorInput) => {
      if (err) {
        return false;
      }
      try {
        values.vendorCategories = vendorContext.selectedItemClasses;
        const result = await saveVendor({
          variables: { data: values },
        });
        if (result && result.data) {
          setTimeout(() => {
            form.resetFields();
            props.history.push('/corporate/vendors');
          }, 500);
        }
      } catch (ex) {
        setSaveError(ex.message);
      }
    });
  };

  return (
    <Form onSubmit={e => handleSubmit(e)} className="login-form">
      {saveError && <GraphQLError error={undefined} message={saveError} />}
      <Row gutter={12}>
        <Col xs={12}>
          <FormItem hasFeedback>
            <label className="form-label mb-0">Name</label>
            {getFieldDecorator('name', {
              initialValue: vendor!.name,
              rules: [{ required: true, message: 'Please enter Name' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />)}
          </FormItem>
        </Col>
        <Col xs={12}>
          <FormItem hasFeedback>
            <label className="form-label mb-0">Logo File Name</label>
            {getFieldDecorator('logo', {
              initialValue: vendor!.logo,
              rules: [{ required: true, message: 'Please enter Logo File Name' }],
            })(<Input prefix={<Icon type="image" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Logo File Name" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs>
            {props.itemClasses.groups!.map((group, index) => {
              const vc = find(vendorCategories, vc => vc.value === group.category);
              const vendorItemClasses = find(vendor!.vendorCategories, vvc => vvc.category === group.category);
              return (
                <Tabs.TabPane tab={vc!.label} key={vc!.value}>
                  <ItemClassCollection
                    group={group}
                    category={group.category}
                    vendorItemClasses={
                      vendorItemClasses ? vendorItemClasses.itemClasses.reduce((prev, current) => prev.concat([current.itemClass]), new Array<string>()) : []
                    }
                  />
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
      <Row type="flex" gutter={12} justify="end" className="form-actions-test">
        <Col>
          {getFieldDecorator('id', {
            initialValue: Number(vendor!.id),
          })(<InputNumber placeholder="id" style={{ visibility: 'hidden' }} />)}
          <Button htmlType="button" type="default" icon="left" size="large" className="utils__fullWidthButton" onClick={() => props.history.goBack()}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button htmlType="submit" type="primary" icon="user" size="large" className="utils__fullWidthButton">
            Update Vendor
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(withRouter(GetVendor(AddEditVendor as any) as any));
