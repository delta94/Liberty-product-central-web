import * as React from 'react';
import { ProductFileType } from '@/components/ProductFileType';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSaveUserJobMutation, UserJobStatusEnum } from 'graphql';
import { PartnerWizardContext } from '../Components/PartnerWizardContext';

// const Step = Steps.Step;

export interface WizardProps extends RouteComponentProps<any> {}

const Step1 = (props: WizardProps) => {
  const partnerWizardContext = React.useContext(PartnerWizardContext);
  const [fileType, setFileType] = React.useState('');
  const [saveUserJob] = useSaveUserJobMutation();

  const next = async (fileType: string) => {
    try {
      partnerWizardContext.fileType = fileType;
      await saveUserJob({ variables: { data: { fileType, status: UserJobStatusEnum.InProgress } } });
      partnerWizardContext.step = 1;
      props.history.push('/partners/wizard/step-2');
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  return (
    <div className="wizard">
      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProductFileType fileType={fileType} setFileType={setFileType} next={next} />
      </div>
      <div
        style={{
          padding: '30px 30px 50px 30px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      />
    </div>
  );
};

export default withRouter(Step1);
