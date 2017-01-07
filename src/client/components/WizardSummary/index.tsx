import * as React from 'react';
import styles from './index.module.scss';
import { PartnerWizardContext } from '@/routes/partners/Wizard/Components/PartnerWizardContext';
import { UserJob } from 'graphql';
import { find } from 'lodash';
import CategorySummary from './CategorySummary';

export interface CollectionsProps {
  userJob: UserJob;
}

const Collections = (props: CollectionsProps) => {
  const context = React.useContext(PartnerWizardContext);

  return (
    <div className={styles.wrapper}>
      {props.userJob.userJobCategories!.map((userCategory, index: number) => {
        const category = find(context.categories, c => c.abbreviation === userCategory.category);
        const img = require(`assets/img/products/${category!.image}`);
        return (
          <div key={index}>
            <CategorySummary category={category!} userCategory={userCategory} img={img} />
          </div>
        );
      })}
    </div>
  );
};

export default Collections;
