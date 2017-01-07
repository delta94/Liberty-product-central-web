import * as React from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

export interface IWizardHeaderProps {
  step: number;
  itemClasses: string[];
}

export default (props: IWizardHeaderProps) => {
  return (
    <div className="wizard">
      <div style={{ padding: '20px', backgroundColor: '#383c4f' }}>
        <Steps current={props.step}>
          {props.itemClasses.map(itemClass => (
            <Step key={itemClass} title={itemClass} />
          ))}
        </Steps>
      </div>
    </div>
  );
};
