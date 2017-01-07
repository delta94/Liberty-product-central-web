import * as React from 'react';
import { Icon } from 'antd';
import { uniq, findIndex } from 'lodash';
import { ICategory } from '@/routes/partners/Wizard/categories';
import { PartnerWizardContext } from '@/routes/partners/Wizard/Components/PartnerWizardContext';
import styles from './index.module.scss';

export interface CategoryImageProps {
  id: number;
  category: ICategory;
  // onSelected: (title: string) => void;
}

export function CategoryImage(props: CategoryImageProps) {
  let partnerWizardContext = React.useContext(PartnerWizardContext);
  let { selectedCategories } = partnerWizardContext;
  const [selected, setSelected] = React.useState(false);
  const { abbreviation } = props.category;

  React.useEffect(() => {
    const index = findIndex(selectedCategories, cat => cat === abbreviation);
    if (index >= 0) {
      setSelected(true);
    }
  }, [selectedCategories, abbreviation]);

  const handleClick = () => {
    if (!selected) {
      partnerWizardContext.selectedCategories = uniq(partnerWizardContext.selectedCategories.concat([props.category.abbreviation]));
    } else {
      const index = findIndex(partnerWizardContext.selectedCategories, cat => cat === props.category.abbreviation);
      partnerWizardContext.selectedCategories.splice(index, 1);
    }
    setSelected(!selected);
  };

  const img = require(`assets/img/products/${props.category.image}`);
  return (
    <div
      onClick={handleClick}
      style={{
        backgroundImage: `url('${img}')`,
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        marginTop: 16,
      }}
    >
      <img src={img} style={{ width: '100%', height: 'auto', visibility: 'hidden' }} alt="" />
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '25px',
          right: '25px',
          backgroundColor: '#fff',
          width: 'calc(100% - 50px)',
        }}
      >
        <div className={styles.categoryTitle}>{props.category.category}</div>
        {selected && <Icon className={styles.anticonCheckCircleSelected} type="check-circle" theme="twoTone" twoToneColor="#6b8d04" />}
      </div>
    </div>
  );
}
