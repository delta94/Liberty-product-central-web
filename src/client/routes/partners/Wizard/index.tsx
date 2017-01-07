import * as React from 'react';
// import { Steps } from 'antd';
// import Header from './Components/Header';
// import { CategoryImage } from '@/components/CategoryImage';
import './index.scss';
// import { uniqBy, find, findIndex } from 'lodash';
// import { ICategory } from './categories';
// import Collections from '@/components/Collections';
// import { ProductFileType } from '@/components/ProductFileType';
// import WizardSummary from '@/components/WizardSummary';
// import { GET_CATEGORIES, GetVendorCategoriesQueryResponse, GET_ITEM_CLASSES_FOR_CATEGORIES, GetItemClassesForCategoriesResponse } from './Wizard.queries';
// import { Query } from 'react-apollo';
// import GraphQLError from '@/components/GraphQLError';
import { withRouter, RouteComponentProps, Redirect, Route } from 'react-router';
import { PartnerWizardContextProvider, partnerWizardInitialState } from './Components/PartnerWizardContext';
// import Wizard from '@/routes/corporate/Wizard';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Header from './Components/Header';

// const Step = Steps.Step;

export interface WizardProps extends RouteComponentProps<any> {}

const Wizard = (props: WizardProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  // const { fileType, selectAllItemClasses, selectedCategories, selectedItemClasses, categories } = React.useContext(PartnerWizardContext);

  const {
    location: { pathname },
  } = props;

  React.useEffect(() => {
    const step = Number.parseInt(pathname[pathname.length - 1]);
    setCurrentStep(step - 1);
  }, [pathname]);

  return (
    <PartnerWizardContextProvider value={partnerWizardInitialState}>
      <Header step={currentStep} />
      <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/step-1`} />} />
      <Route path={`${props.match.url}/step-1`} render={props => <Step1 {...props} />} />
      <Route path={`${props.match.url}/step-2`} render={props => <Step2 {...props} />} />
      <Route path={`${props.match.url}/step-3`} render={props => <Step3 {...props} />} />
      <Route path={`${props.match.url}/step-4`} render={props => <Step4 {...props} />} />
    </PartnerWizardContextProvider>
  );
};

export default withRouter(Wizard);
