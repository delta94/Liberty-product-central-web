import * as React from 'react';
import Header from '@/components/Header';
import { Steps } from 'antd';
const Step = Steps.Step;

export interface IWizardHeaderProps {
  step: number;
}

export default function WizardHeader(props: IWizardHeaderProps) {
  return (
    <div className="wizard">
      <Header />
      <div style={{ padding: '20px', backgroundColor: '#383c4f' }}>
        <Steps current={props.step}>
          <Step title="Product File Type" description="Select All You Want to Download" />
          <Step title="Categories" description="Select Which Categories" />
          <Step title="Collections" description="Select Which Collections from the Categories Selected" />
          <Step title="Download" description="Download Your Selections" />
        </Steps>
      </div>
    </div>
  );
}
