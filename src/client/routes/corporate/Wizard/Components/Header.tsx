import * as React from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

export interface IWizardHeaderProps {
  step: number;
}

export default function WizardHeader(props: IWizardHeaderProps) {
  return (
    <div className="wizard">
      <div style={{ padding: '20px' }}>
        <Steps current={props.step}>
          <Step title="Select Vendor" description="Select Which Vendor for this Export" />
          <Step title="Enter Product" description="Enter Product to be Included in the Export" />
          <Step title="Download" description="Download Product File" />
        </Steps>
      </div>
    </div>
  );
}
