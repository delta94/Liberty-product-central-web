import * as React from 'react';
import { Steps, Button } from 'antd';
import VendorSelection from '@/components/VendorSelection';
import AmazonFormInput from '@/components/AmazonFormInput';

const Step = Steps.Step;

export interface WizardProps {}

export default (props: WizardProps) => {
  const [step, setStep] = React.useState(0);
  // const [products, setProducts] = React.useState(new Array<any>());
  const [hideWizardNav] = React.useState(false);

  const next = () => {
    setStep(step + 1);
  };

  const prev = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Steps current={step}>
          <Step title="Select Vendor" description="Select Which Vendor for this Export" />
          <Step title="Enter Product" description="Enter Product to be Included in the Export" />
          <Step title="Download" description="Download Product File" />
        </Steps>
      </div>
      <div
        style={{
          justifyItems: 'center',
          justifyContent: 'center',
        }}
      >
        {step === 0 && <VendorSelection next={next} />}
        {step === 1 && (
          <AmazonFormInput
          // shouldHideWizardNav={setHideWizardNav}
          // setProducts={setProducts}
          // products={products}
          />
        )}
        {step === 2 && (
          <div style={{ margin: '100px auto', width: '100%', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 800, fontSize: '32px' }}>
              Your Product File
              <br />
              is Ready for Download.
            </h2>
            <Button
              type="ghost"
              size="large"
              icon="cloud-download"
              htmlType="button"
              style={{
                fontSize: '48px',
                lineHeight: '40px',
                height: '150px',
                padding: '50px',
                fontWeight: 700,
              }}
            >
              Download
            </Button>
          </div>
        )}
      </div>
      {!hideWizardNav && (
        <div
          style={{
            padding: '30px 30px 50px 30px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {step > 0 && step < 5 && <Button onClick={() => prev()}>Previous</Button>}
          {step > 0 && step < 2 && (
            <Button type="primary" style={{ marginLeft: 8 }} onClick={() => next()}>
              Next
            </Button>
          )}
        </div>
      )}
    </>
  );
};
