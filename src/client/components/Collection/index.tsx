import * as React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { ICategory } from '@/routes/partners/Wizard/categories';
import styles from './index.module.scss';
import { CategoryItemClassGroup, CategoryItemClass } from 'graphql';
import { PartnerWizardContext, IItemClassAndDescription } from '@/routes/partners/Wizard/Components/PartnerWizardContext';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { findIndex } from 'lodash';
import { find } from 'lodash';

export interface CollectionProps {
  category: ICategory;
  group: CategoryItemClassGroup;
  userItemClasses: IItemClassAndDescription[];
  setCategories?: any;
  setAllChecked: boolean | undefined;
}

const Collection = React.memo((props: CollectionProps) => {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [selectedItemClasses, setSelectedItemClasses] = React.useState(new Array<IItemClassAndDescription>());
  const partnerWizardContext = React.useContext(PartnerWizardContext);
  const { setAllChecked, userItemClasses, group, category } = props;

  React.useEffect(() => {
    checkAllItems(setAllChecked ? true : false);
    setChecked(setAllChecked ? true : false);
    setIndeterminate(false);
  }, [setAllChecked]);

  // React.useEffect(() => {
  //   if (userItemClasses && group.itemClasses) {
  //     // setSelectedItemClasses(userItemClasses);
  //     // setIndeterminate(group.itemClasses!.length !== userItemClasses.length && userItemClasses.length > 0);
  //     setChecked(group.itemClasses.length === userItemClasses.length);
  //     setItemClasses(userItemClasses);
  //   }
  // }, [userItemClasses, group]);

  const checkAllItems = (checked: boolean) => {
    setChecked(checked);
    const itemClasses = checked
      ? group.itemClasses!.reduce((prev, current) => prev.concat([{ itemClass: current.itemClass!, itemClassDescription: current.itemClassDescription! }]), new Array<IItemClassAndDescription>())
      : [];
    setSelectedItemClasses(itemClasses);
    setItemClasses(itemClasses);
    setIndeterminate(false);
    setChecked((group.itemClasses && group.itemClasses.length) === itemClasses.length);
  };

  const onChange = (e: CheckboxValueType[]) => {
    let itemClasses = new Array<IItemClassAndDescription>();
    e.forEach(ic => {
      const itemClass = find(props.group.itemClasses, itemClass => itemClass.itemClass === ic);
      if (itemClass) {
        itemClasses.push({ itemClass: itemClass!.itemClass!, itemClassDescription: itemClass!.itemClassDescription! });
      }
    });

    setSelectedItemClasses(itemClasses);
    setItemClasses(itemClasses);
    setIndeterminate(group.itemClasses!.length !== itemClasses.length && itemClasses.length > 0);
    setChecked(group.itemClasses!.length === itemClasses.length);
  };

  const checkAll = (e: CheckboxChangeEvent) => {
    checkAllItems(e.target.checked);
    setIndeterminate(false);
  };

  const setItemClasses = (itemClasses: IItemClassAndDescription[]) => {
    if (partnerWizardContext.selectedItemClasses.length) {
      const index = findIndex(partnerWizardContext.selectedItemClasses, ic => ic.category === category.abbreviation);
      if (index >= 0) {
        partnerWizardContext.selectedItemClasses[index] = { category: category.abbreviation, itemClasses };
      } else {
        partnerWizardContext.selectedItemClasses.push({ category: category.abbreviation, itemClasses });
      }
    } else {
      partnerWizardContext.selectedItemClasses = [{ category: category.abbreviation, itemClasses }];
    }
  };

  const img = require(`assets/img/products/${props.category.image}`);
  return (
    <div className={styles.wrapper}>
      <Row gutter={24} style={{ marginBottom: 30 }}>
        <Col xs={24} sm={6}>
          <div
            style={{
              backgroundImage: `url('${img}')`,
              width: '100%',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer',
            }}
          >
            <img
              src={img}
              style={{
                width: '100%',
                height: 'auto',
                visibility: 'hidden',
              }}
              alt=""
            />
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
              <div
                style={{
                  padding: '16px 0',
                  fontSize: 24,
                  textTransform: 'uppercase',
                  backgroundColor: '#383c4f',
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 700,
                }}
              >
                {category.category}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={18} className={styles.list}>
          <Row>
            <Col>
              <Checkbox checked={checked} indeterminate={indeterminate} onChange={checkAll} style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Select All
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col />
          </Row>
          <Row>
            {group.itemClasses && (
              <Checkbox.Group style={{ width: '100%' }} value={selectedItemClasses.reduce((prev, current) => prev.concat([current.itemClass]), new Array<string>())} onChange={onChange}>
                {group.itemClasses!.map((collection: CategoryItemClass, collectionIndex: number) => {
                  return (
                    <Col key={collectionIndex} xs={24} sm={6}>
                      <Checkbox value={collection.itemClass}>
                        {collection.itemClassDescription} ({collection.itemClass})
                      </Checkbox>
                    </Col>
                  );
                })}
              </Checkbox.Group>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default Collection;
