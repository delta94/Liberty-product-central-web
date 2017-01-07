import * as React from 'react';
import { Button, Row, Col } from 'antd';
import GraphQLError from '@/components/GraphQLError';
import { PartnerWizardContext } from '../Components/PartnerWizardContext';
import { useGetUserJobAndFileUrlQuery } from 'graphql';
import LoadingSpinner from '@/components/LoadingSpinner';
import { withRouter, RouteComponentProps } from 'react-router';
import WizardSummary from '@/components/WizardSummary';

export interface WizardProps extends RouteComponentProps<any> {}

const Step4 = (props: WizardProps) => {
  const [uiError] = React.useState<string | undefined>(undefined);
  const { data, error, loading } = useGetUserJobAndFileUrlQuery({ fetchPolicy: 'network-only' });

  let partnerWizardContext = React.useContext(PartnerWizardContext);
  partnerWizardContext.fileType = '';
  partnerWizardContext.itemClasses = [];
  partnerWizardContext.selectAllItemClasses = false;
  partnerWizardContext.selectedCategories = [];
  partnerWizardContext.selectedItemClasses = [];
  partnerWizardContext.userJob = null;

  if (loading) return <LoadingSpinner tip="Loading Your Selections..." />;
  if (error) return <GraphQLError error={undefined} message={error.message} />;
  const userJob = data && data.getUserJobForUserWizardCompleted;

  const prev = () => {
    props.history.push('/partners/wizard/step-1');
  };

  if (error) return <GraphQLError error={error} />;
  if (loading)
    return (
      <div style={{ width: '100vw', padding: '100px auto' }}>
        <LoadingSpinner />
      </div>
    );

  // if (data) {
  //   const selected = data.getUserJobForUserWizardCompleted.userJobCategories
  //     ? data.getUserJobForUserWizardCompleted.userJobCategories.reduce((prev, current) => prev.concat([current.category]), new Array<string>())
  //     : [];
  //   // partnerWizardContext.selectedCategories = selected;
  //   // partnerWizardContext.userJob = data.getUserJobForUserWizardCompleted;
  // } else setUiError('filler');

  return (
    <div className="wizard">
      {uiError && <GraphQLError error={undefined} message={uiError} />}
      <Row type="flex" justify="center">
        <Col>
          {data!.getUserJobForUserWizardCompleted.fileType === 'Images Only' ? (
            <h2 style={{ margin: '40px 0 20px 0', fontWeight: 700, color: '#6b8d04', textAlign: 'center' }}>
              We are processing your request and your download links will be emailed within 15 minutes.
            </h2>
          ) : (
            <Button
              type="primary"
              style={{
                width: '360px',
                padding: '30px',
                margin: '20px 20px 0 20px',
                height: '75px',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: '0px',
              }}
              href={data!.getProductDataFileUrl.url}
              icon="cloud-download"
            >
              Click To Download All Categories
            </Button>
          )}
        </Col>
      </Row>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <WizardSummary userJob={userJob!} />
      </div>
      <div
        style={{
          padding: '0 30px 50px 30px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={() => prev()}>Start Over</Button>
      </div>
    </div>
  );
};

export default withRouter(Step4);
