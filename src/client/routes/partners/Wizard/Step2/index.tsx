import * as React from 'react';
import { Button, Row, Col } from 'antd';
import { CategoryImage } from '@/components/CategoryImage';
import { find } from 'lodash';
import GraphQLError from '@/components/GraphQLError';
import { PartnerWizardContext } from '../Components/PartnerWizardContext';
import { useGetUserJobAndVendorCategoriesQuery, useSaveUserJobMutation, UserJobCategoryInput, UserJobStatusEnum } from 'graphql';
import { withRouter, RouteComponentProps } from 'react-router';
import omitDeep from 'omit-deep-lodash';
import LoadingSpinner from '@/components/LoadingSpinner';

export interface WizardProps extends RouteComponentProps<any> {}

const Step2 = (props: WizardProps) => {
  const [uiError, setUiError] = React.useState<string | undefined>(undefined);
  const { data, error, loading } = useGetUserJobAndVendorCategoriesQuery({ fetchPolicy: 'network-only' });
  const [saveUserJob] = useSaveUserJobMutation();
  let partnerWizardContext = React.useContext(PartnerWizardContext);
  let { selectedCategories, userJob, categories } = partnerWizardContext;

  const next = async () => {
    if (partnerWizardContext.selectedCategories.length > 0) {
      let uj = userJob!;
      const catsFormatted = partnerWizardContext.selectedCategories.map<UserJobCategoryInput>(item => ({
        category: item,
        userJobId: uj.id!,
      }));

      // console.log('partnerWizardContext.selectedCategories', partnerWizardContext.selectedCategories, catsFormatted);

      try {
        const data = Object.assign({}, omitDeep(uj, '__typename', 'created'), { userJobCategories: catsFormatted, status: UserJobStatusEnum.InProgress });
        // console.log('partnerWizardContext.selectedCategories', partnerWizardContext.selectedCategories, catsFormatted, data);
        await saveUserJob({
          variables: {
            data,
          },
        });
        props.history.push('/partners/wizard/step-3');
      } catch (ex) {
        setUiError(ex.message);
      }
    } else {
      // show error
      setUiError('Please Select a Category');
    }
  };

  const prev = () => {
    props.history.goBack();
  };

  if (error) return <GraphQLError error={error} />;
  if (loading)
    return (
      <div style={{ width: '100vw', padding: '100px auto' }}>
        <LoadingSpinner />
      </div>
    );
  if (data) {
    const selected = data.getUserJobForUserInProgress.userJobCategories
      ? data.getUserJobForUserInProgress.userJobCategories.reduce((prev, current) => prev.concat([current.category]), new Array<string>())
      : [];
    selectedCategories = selected;
    userJob = data.getUserJobForUserInProgress;
    partnerWizardContext.selectedCategories = selected;
    // partnerWizardContext.userJob = data.getUserJobForUserInProgress;
  }

  return (
    <div className="wizard">
      {uiError && <div>{uiError}</div>}
      <Row gutter={16}>
        {data!.vendorCategoriesForUser!.map((c: any, index: number) => {
          const category = find(categories, cat => cat.abbreviation === c.category);
          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6} style={{ marginBottom: '16px' }}>
              <CategoryImage id={index} category={category!} />
            </Col>
          );
        })}
      </Row>
      <div
        style={{
          padding: '30px 30px 50px 30px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={() => prev()}>Previous</Button>
        <Button type="primary" style={{ marginLeft: 8 }} onClick={() => next()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Step2);
