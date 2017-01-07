import * as React from 'react';
import { Row, Col, Card, Button, Form, notification, Popconfirm, Input, Icon, Checkbox } from 'antd';
import './index.scss';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useCancelShipmentMutation, useReprintLabelsMutation, useXpoRowsBySopNumberQuery, useTransferShipmentLocationMutation } from 'graphql';

export interface IXpoProps extends FormComponentProps {
  form: WrappedFormUtils<any>;
}

const Xpo = ({ form }: IXpoProps) => {
  const [sopNumber, setSopNumber] = React.useState('');
  const { data, loading } = useXpoRowsBySopNumberQuery({ variables: { sopNumber }, skip: sopNumber === '' });

  const [cancelShipment] = useCancelShipmentMutation();
  const [reprintLabels] = useReprintLabelsMutation();
  const [transferShipment] = useTransferShipmentLocationMutation();

  const lookupSopNumber = () => {
    setSopNumber(form.getFieldValue('sopNumber'));
  };

  const onCancel = async () => {
    const result = await cancelShipment({ variables: { sopNumber } }).catch(ex => console.log(ex.message));
    if (result && result.data) {
      notification[result.data.cancelShipment.success ? 'success' : 'error']({
        message: 'Cancel Shipment',
        description: result.data.cancelShipment.message,
      });
      form.resetFields();
    }
  };

  const onReprint = async () => {
    const result = await reprintLabels({ variables: { sopNumber } }).catch(ex => console.log(ex.message));
    if (result && result.data) {
      notification[result.data.reprintLabels.success ? 'success' : 'error']({
        message: 'Reprint Labels',
        description: result.data.reprintLabels.message,
      });
      form.resetFields();
    }
  };

  const onTransferShipment = async () => {
    const variables = {
      SopNumber: sopNumber,
      NewLocation: data!.xpoRowsBySopNumber[0].OrderLocationCode!.trim() === 'ATL WHSE' ? 'CHI WHSE' : 'ATL WHSE',
      ForceUpdate: form.getFieldValue('ForceUpdate'),
      UpdateReadyDate: form.getFieldValue('UpdateReadyDate'),
    };
    const result = await transferShipment({ variables }).catch(ex => console.log(ex.message));
    if (result && result.data) {
      notification[result.data.transferShipmentLocation.success ? 'success' : 'error']({
        message: 'Transfer Shipment Location',
        description: result.data.transferShipmentLocation.message,
      });
      form.resetFields();
    }
  };

  const renderXpoRow = (row: any[]) => {
    const sop = row[0];

    let address = '';
    if (sop.Address2.trim() !== '') {
      address = `${sop.Address1.trim()}<br/>${sop.Address2.trim()}`;
    } else {
      address = sop.Address1.trim();
    }
    return (
      <React.Fragment>
        <Row type="flex" gutter={20}>
          <Col xs={24} sm={12}>
            <strong>SOP Number:</strong> {sop.SopNumber.trim()}
          </Col>
          <Col xs={24} sm={12}>
            <strong>PO Number:</strong> {sop.AdditionalPO.trim()}
          </Col>
        </Row>

        <Row type="flex" gutter={20}>
          <Col xs={24} sm={12}>
            <strong>Location:</strong> {sop.OrderLocationCode.trim() === 'ATL WHSE' ? 'ATLANTA' : 'CHICAGO'}
          </Col>
          <Col xs={24} sm={12}>
            <strong>Service Level:</strong> {sop.ServiceLevelCode.trim()}
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingTop: 20 }}>
            <strong>Ship To:</strong>
          </Col>
        </Row>
        <Row>
          <Col>{sop.ShipToName.trim()}</Col>
        </Row>
        <Row>
          <Col>{address}</Col>
        </Row>
        <Row>
          <Col>
            {sop.City}, {sop.State} {sop.ZipCode}
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col>
            <Popconfirm placement="top" title={'Are You Sure You Want to Reprint Labels?'} onConfirm={onReprint} okText="Yes" cancelText="No">
              <Button type="primary" block>
                Reprint Labels
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col>
            <Popconfirm placement="top" title={'Are You Sure You Want to Cancel this Shipment?'} onConfirm={onCancel} okText="Yes" cancelText="No">
              <Button type="danger" block>
                Cancel Shipment
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  return (
    <div className="xpo">
      <Form className="login-form">
        <Row>
          <Col style={{ fontSize: 32, fontWeight: 700, marginBottom: 30, textAlign: 'center', color: '#545454' }}>XPO Utilities</Col>
        </Row>
        {sopNumber !== '' && !loading && data && data.xpoRowsBySopNumber.length === 0 && (
          <Row>
            <Col xs={12}>
              <div style={{ margin: '0 auto 20px', fontWeight: 700, textAlign: 'center', fontSize: 20, color: 'red' }}>SopNumber Not Found</div>
            </Col>
          </Row>
        )}
        <Row gutter={10} type="flex">
          <Col xs={24} sm={12}>
            <Card title="XPO Utilities" size="small" style={{ fontWeight: 700, width: '100%' }}>
              <Row>
                <Col>
                  <FormItem label="Enter SOP Number to Lookup">
                    {form.getFieldDecorator('sopNumber', {
                      initialValue: sopNumber,
                      rules: [{ required: true, message: 'Enter SOP Number to Lookup' }],
                    })(<Input style={{ width: '100%' }} />)}
                  </FormItem>
                </Col>
              </Row>
              <Button type="primary" block onClick={lookupSopNumber}>
                Lookup SOP Number
              </Button>
            </Card>
          </Col>
          {sopNumber !== '' && !loading && data && data.xpoRowsBySopNumber.length > 0 && (
            <Col xs={24} sm={12}>
              <Row>
                <Col>
                  <Card title="Order Details" size="small" style={{ fontWeight: 700, width: '100%' }}>
                    <Col>{renderXpoRow(data.xpoRowsBySopNumber)}</Col>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card title="Transfer Shipment Location" size="small" style={{ fontWeight: 700, width: '100%', marginTop: 20 }}>
                    <Row style={{ marginTop: 15 }}>
                      <Col>
                        <Row type="flex" align="middle" style={{ marginBottom: 20 }}>
                          <Col xs={8} style={{ textAlign: 'center' }}>
                            FROM WAREHOUSE
                            <br />
                            <span style={{ fontSize: 18, fontWeight: 700, lineHeight: '18px', color: '#6b8d04' }}>
                              {data.xpoRowsBySopNumber[0].OrderLocationCode!.trim() === 'ATL WHSE' ? 'ATLANTA' : 'CHICAGO'}
                            </span>
                          </Col>
                          <Col xs={8} style={{ textAlign: 'center' }}>
                            <Icon type="arrow-right" style={{ fontSize: '32px' }} />
                          </Col>
                          <Col xs={8} style={{ textAlign: 'center' }}>
                            TO WAREHOUSE
                            <br />
                            <span style={{ fontSize: 18, fontWeight: 700, lineHeight: '18px', color: '#6b8d04' }}>
                              {data.xpoRowsBySopNumber[0].OrderLocationCode!.trim() === 'ATL WHSE' ? 'CHICAGO' : 'ATLANTA'}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <FormItem>
                          {form.getFieldDecorator('ForceUpdate', {
                            initialValue: true,
                          })(<Checkbox defaultChecked={true}>Force Update Even if XPO Cancel Fails</Checkbox>)}
                        </FormItem>
                      </Col>
                      <Col>
                        <FormItem>
                          {form.getFieldDecorator('UpdateReadyDate', {
                            initialValue: true,
                          })(<Checkbox defaultChecked={true}>Update Ready Date if in the past</Checkbox>)}
                        </FormItem>
                      </Col>
                      <Col>
                        <Popconfirm
                          placement="top"
                          title={'Are You Sure You Want to Transfer this Shipment?'}
                          onConfirm={onTransferShipment}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="danger" block>
                            Transfer Shipment Location
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        {/* <Row>
            <Col xs={24} sm={12}>
              <Card title="Cancel Shipment" size="small" style={{ fontWeight: 700, width: '100%' }}>
                <Row>
                  <Col>
                    <FormItem label="Enter SOP Number to Cancel Shipment">
                      {form.getFieldDecorator('cancelSopNumber', { initialValue: '', rules: [{ required: true, message: 'Enter SOP Number of the Shipment to Cancel' }] })(
                        <Input style={{ width: '100%' }} />,
                      )}
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
          </Row> */}
      </Form>
    </div>
  );
};

export default Form.create<IXpoProps>()(Xpo as any);
