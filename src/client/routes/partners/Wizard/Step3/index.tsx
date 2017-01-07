import * as React from 'react';
import { Button, Row, Spin, Col } from 'antd';
import { find, findIndex } from 'lodash';
import Collection from '@/components/Collection';
import GraphQLError from '@/components/GraphQLError';
import { PartnerWizardContext, IItemClassAndDescription } from '../Components/PartnerWizardContext';
import { useGetUserJobAndItemClassesQuery, useSaveUserJobMutation, UserJobStatusEnum } from 'graphql';
import LoadingSpinner from '@/components/LoadingSpinner';
import { withRouter, RouteComponentProps } from 'react-router';
import omitDeep from 'omit-deep-lodash';

export interface WizardProps extends RouteComponentProps<any> {}

const Step3 = (props: WizardProps) => {
  const [saving, setSaving] = React.useState(false);
  const [uiError, setUiError] = React.useState<string | undefined>(undefined);
  const [allChecked, setAllChecked] = React.useState<boolean | undefined>(undefined);
  const { data, error, loading } = useGetUserJobAndItemClassesQuery({ fetchPolicy: 'network-only' });
  const [saveUserJob] = useSaveUserJobMutation();
  const partnerWizardContext = React.useContext(PartnerWizardContext);

  const next = async () => {
    setSaving(true);
    let uj = partnerWizardContext.userJob!;

    for (let ic of partnerWizardContext.selectedItemClasses) {
      const index = findIndex(partnerWizardContext.userJob!.userJobCategories, ujc => ujc.category === ic.category);
      if (index >= 0) {
        const ujc = partnerWizardContext.userJob!.userJobCategories![index];
        ujc!.userJobCategoryItemClasses = ic.itemClasses.map(ic => {
          return { userJobId: ujc.userJobId, userJobCategoryId: ujc.id!, itemClass: ic.itemClass, itemClassDescription: ic.itemClassDescription };
        });
      }
    }
    try {
      await saveUserJob({
        variables: {
          data: Object.assign({}, omitDeep(uj, '__typename', 'created'), { inProgress: false, status: UserJobStatusEnum.WizardCompleted }),
        },
      });
      setSaving(false);
      props.history.push('/partners/wizard/step-4');
    } catch (ex) {
      setSaving(false);
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
  if (!loading && data) {
    const selected = data.getUserJobForUserInProgress.userJobCategories
      ? data.getUserJobForUserInProgress.userJobCategories.reduce((prev, current) => prev.concat([current.category]), new Array<string>())
      : [];
    partnerWizardContext.selectedCategories = selected;
    partnerWizardContext.userJob = data.getUserJobForUserInProgress;
  } else setUiError('filler');

  return (
    <div className="wizard">
      {uiError && <GraphQLError error={undefined} message={uiError} />}
      <Row type="flex" justify="end">
        <Col>
          <Button
            type="primary"
            style={{ margin: '20px 20px 0 0' }}
            onClick={() => {
              setAllChecked(!allChecked);
            }}
          >
            {allChecked ? 'Unselect' : 'Select'}&nbsp;All Collections
          </Button>
        </Col>
      </Row>

      <Row gutter={16}>
        <Spin spinning={saving} tip="Saving Your Selections...">
          {data!.getUserJobForUserInProgress!.userJobCategories!.map((category: any, index: number) => {
            const groups = data!.getItemClassesForCategoriesForUser ? data!.getItemClassesForCategoriesForUser.groups : [];
            const group = find(groups, group => group.category === category.category);
            const categoryData = find(partnerWizardContext.categories, c => c.abbreviation === category.category);
            const userJobCategory = data!.getUserJobForUserInProgress.userJobCategories
              ? find(data!.getUserJobForUserInProgress.userJobCategories, ujc => ujc.category === category.category)
              : undefined;
            const userJobCategoryItemClasses = userJobCategory ? userJobCategory.userJobCategoryItemClasses : [];
            const userJobItemClassesSelected = userJobCategoryItemClasses
              ? userJobCategoryItemClasses.reduce(
                  (prev, current) => prev.concat({ itemClass: current.itemClass, itemClassDescription: current.itemClassDescription }),
                  new Array<IItemClassAndDescription>(),
                )
              : [];
            if (group) {
              return (
                <div key={index}>
                  <Collection category={categoryData!} group={group} setAllChecked={allChecked} userItemClasses={userJobItemClassesSelected} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </Spin>
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

export default withRouter(Step3);
