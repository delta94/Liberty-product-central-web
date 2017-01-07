import * as React from 'react';
import { Row, Col, Card, Button, Form, notification, Popconfirm } from 'antd';
import './index.scss';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useCancelShipmentMutation, useReprintLabelsMutation } from 'graphql';

export interface IXpoProps extends FormComponentProps {
  form: WrappedFormUtils<any>;
}

const Xpo = ({ form }: IXpoProps) => {
  const [cancelShipment] = useCancelShipmentMutation();
  const [reprintLabels] = useReprintLabelsMutation();

  const onCancel = () => {
    form.validateFields(['cancelSopNumber'], async (err: any, values: any) => {
      if (err) {
        console.log('err', err);
      } else {
        const result = await cancelShipment({ variables: { sopNumber: values.cancelSopNumber } }).catch(ex => console.log(ex.message));
        if (result && result.data) {
          notification[result.data.cancelShipment.success ? 'success' : 'error']({
            message: 'Cancel Shipment',
            description: result.data.cancelShipment.message,
          });
          form.resetFields();
        }
      }
    });
  };

  const onReprint = () => {
    form.validateFields(['reprintSopNumber'], async (err: any, values: any) => {
      if (err) {
        console.log('err', err);
      } else {
        const result = await reprintLabels({ variables: { sopNumber: values.reprintSopNumber } }).catch(ex => console.log(ex.message));
        if (result && result.data) {
          notification[result.data.reprintLabels.success ? 'success' : 'error']({
            message: 'Reprint Labels',
            description: result.data.reprintLabels.message,
          });
          form.resetFields();
        }
      }
    });
  };

  return (
    <div className="xpo">
      <Form className="login-form">
        <Row>
          <Col style={{ fontSize: 32, fontWeight: 700, marginBottom: 30, textAlign: 'center', color: '#545454' }}>XPO Utilities</Col>
        </Row>
        <Row gutter={10} type="flex">
          <Col xs={24} sm={12}>
            <FormItem label="Enter SOP Number to Reprint">
              {form.getFieldDecorator('reprintSopNumber', {
                initialValue: '',
                rules: [{ required: true, message: 'Enter SOP Number of the Shipment to Cancel' }],
              })(<input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <Card title="Cancel Shipment" size="small" style={{ fontWeight: 700, width: '100%' }}>
              <Row>
                <Col>
                  <FormItem label="Enter SOP Number to Cancel Shipment">
                    {form.getFieldDecorator('cancelSopNumber', {
                      initialValue: '',
                      rules: [{ required: true, message: 'Enter SOP Number of the Shipment to Cancel' }],
                    })(<input style={{ width: '100%' }} />)}
                  </FormItem>
                </Col>
              </Row>
              <Popconfirm placement="top" title={'Are You Sure You Want to Cancel this Shipment?'} onConfirm={onCancel} okText="Yes" cancelText="No">
                <Button type="danger" block>
                  Cancel Shipment
                </Button>
              </Popconfirm>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create<IXpoProps>()(Xpo as any);
