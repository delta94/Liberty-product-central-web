import * as React from 'react';
import Header from '@/components/Header';
import { Steps, Row, Col } from 'antd';
const Step = Steps.Step;

export interface IWizardHeaderProps {
  step: number;
}

export default function WizardHeader(props: IWizardHeaderProps) {
  return (
    <Row type="flex" className="wizard" style={{ alignItems: 'center' }}>
      <Col style={{ flex: 1, verticalAlign: 'center', height: 64, padding: '16px 20px', backgroundColor: '#383c4f' }}>
        <Steps current={props.step}>
          <Step title="Details" />
          <Step title="Pricing" />
          <Step title="Photos" />
          <Step title="Preview" />
        </Steps>
      </Col>
    </Row>
  );
}
