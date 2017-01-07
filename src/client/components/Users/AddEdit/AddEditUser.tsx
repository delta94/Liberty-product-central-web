import * as React from 'react';
import { Form, Row, Col, Input, Icon, Select, Card, Checkbox, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useSaveUserMutation, User, Vendor } from 'graphql';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { CurrentUserContext } from 'client/contexts/CurrentUserContext';
import { some } from 'lodash';

export interface AddEditUserProps extends FormComponentProps {
  form: WrappedFormUtils<any>;
  user: User;
  vendors: Vendor[];
  onSave: () => void;
  onCancel: () => void;
}

const AddEditUser = ({ user, vendors, onSave, onCancel, form }: AddEditUserProps) => {
  const userContext = React.useContext(CurrentUserContext);
  const [saveUser] = useSaveUserMutation();

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        return false;
      }

      const result = await saveUser({
        variables: { data: { ...values, ...{ id: Number(values.id), vendorId: Number(values.vendorId), active: values.active === 1 } } },
      });
      if (result && result.data) {
        form.resetFields();
        onSave();
      }
    });
  };

  const { getFieldDecorator } = form;
  console.log('userContext.user.userRoles', userContext.user.userRoles);
  return (
    <Form onSubmit={e => handleSubmit(e)} className="login-form">
      {/* {mutationError && <GraphQLError error={mutationError} />} */}
      <Row gutter={12}>
        <Col xs={12}>
          {getFieldDecorator('id', {
            initialValue: user!.id,
          })(<Input placeholder="Id" type="hidden" />)}
          {!some(userContext.user.userRoles, userRole => userRole === 'Administrator') && (
            <React.Fragment>
              {getFieldDecorator('vendorId', {
                initialValue: user!.vendorId,
              })(<Input placeholder="Id" type="hidden" />)}
              {getFieldDecorator('active', {
                initialValue: user!.active ? 1 : 0,
              })(<Input type="hidden" />)}
              {getFieldDecorator('role', {
                initialValue: user!.role,
              })(<Input type="hidden" />)}
            </React.Fragment>
          )}
          <FormItem hasFeedback>
            <label className="form-label mb-0">First Name</label>
            {getFieldDecorator('firstName', {
              initialValue: user!.firstName,
              rules: [{ required: true, message: 'Please enter First Name' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
          </FormItem>
        </Col>
        <Col xs={12}>
          <FormItem hasFeedback>
            <label className="form-label mb-0">Last Name</label>
            {getFieldDecorator('lastName', {
              initialValue: user!.lastName,
              rules: [{ required: true, message: 'Please enter Last Name' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={24} sm={14}>
          <FormItem hasFeedback>
            <label className="form-label mb-0">Email Address</label>
            {getFieldDecorator('email', {
              initialValue: user!.email,
              rules: [{ required: true, message: 'Please enter Email Address' }],
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={10}>
          <FormItem className="passwordRequired" hasFeedback>
            <label className="form-label mb-0">Password</label>
            {getFieldDecorator('password', {
              initialValue: user!.password,
              rules: [{ required: false, message: 'Please enter Password' }],
            })(<Input.Password className="password-input" placeholder="Set Password" />)}
          </FormItem>
        </Col>
      </Row>
      {some(userContext.user.userRoles, role => role === 'Administrator') && (
        <Row gutter={12}>
          <Col xs={24} sm={8}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Vendor</label>
              {getFieldDecorator('vendorId', {
                initialValue: user!.vendor ? user!.vendor!.id : null,
                rules: [{ required: false, message: 'Please Select Vendor' }],
              })(
                <Select>
                  {vendors.map(vendor => (
                    <Select.Option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Active</label>
              {getFieldDecorator('active', {
                initialValue: user!.active ? 1 : 0,
                rules: [{ required: true, message: 'Please enter Active Status' }],
              })(
                <Select>
                  <Select.Option value={1}>Active</Select.Option>
                  <Select.Option value={0}>Inactive</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem hasFeedback>
              <label className="form-label mb-0">Roles</label>
              {getFieldDecorator('roles', {
                initialValue: user!.userRoles,
                rules: [{ required: true, message: 'Please enter Role' }],
              })(
                <Select mode="multiple">
                  <Select.Option value="Administrator">Administrator</Select.Option>
                  <Select.Option value="Vendor">Vendor</Select.Option>
                  <Select.Option value="XPO">XPO User</Select.Option>
                  <Select.Option value="Transit">In Transit Transfer</Select.Option>
                  <Select.Option value="Sales Presentation">Sales Presentation</Select.Option>
                  <Select.Option value="Order Transfer">Order Transfer</Select.Option>
                  <Select.Option value="Order Backlog">Order Backlog</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Card size="small" title="Product Alert Preferences">
            <Row gutter={12}>
              <Col xs={24}>
                <FormItem>
                  {getFieldDecorator('alertProductAdded', {
                    initialValue: user!.alertProductAdded ? user!.alertProductAdded : false,
                  })(<Checkbox defaultChecked={user!.alertProductAdded ? user!.alertProductAdded : false}>Alert when new Product Data is Added</Checkbox>)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <FormItem>
                  {getFieldDecorator('alertProductDiscontinued', {
                    initialValue: user!.alertProductDiscontinued ? user!.alertProductDiscontinued : false,
                  })(
                    <Checkbox defaultChecked={user!.alertProductDiscontinued ? user!.alertProductDiscontinued : false}>
                      Alert when new Product Data is Discontinued
                    </Checkbox>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <FormItem className="alertProductUpdated">
                  {getFieldDecorator('alertProductUpdated', {
                    initialValue: user!.alertProductUpdated ? user!.alertProductUpdated : false,
                  })(
                    <Checkbox defaultChecked={user!.alertProductUpdated ? user!.alertProductUpdated : false}>Alert when new Product Data is Updated</Checkbox>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col>
                <FormItem hasFeedback>
                  <label className="form-label mb-0">Alert Address</label>
                  {getFieldDecorator('alertEmail', {
                    initialValue: user!.alertEmail ? user!.alertEmail : user!.email,
                    rules: [{ required: true, message: 'Please enter Alert Email Address' }],
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Alert Email Address (If Different than Your Account Email)"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row type="flex" gutter={12} justify="end" className="form-actions-bottom">
        <Col>
          <Button htmlType="button" type="default" icon="left" size="large" className="utils__fullWidthButton" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button htmlType="submit" type="primary" icon="user" size="large" className="utils__fullWidthButton">
            Update Account
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<AddEditUserProps>()(AddEditUser as any);
