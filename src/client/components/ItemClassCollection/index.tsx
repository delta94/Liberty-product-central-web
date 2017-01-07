import * as React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { CategoryItemClassGroup, CategoryItemClass } from 'graphql';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { findIndex } from 'lodash';
import { find } from 'lodash';
import { VendorContext } from '@/routes/corporate/Vendors/VendorContext';

export interface CollectionProps {
  category: string;
  group: CategoryItemClassGroup;
  vendorItemClasses: string[];
}

const ItemClassCollection = React.memo((props: CollectionProps) => {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [selectedItemClasses, setSelectedItemClasses] = React.useState(new Array<string>());
  const vendorContext = React.useContext(VendorContext);
  const { vendorItemClasses, group, category } = props;

  // React.useEffect(() => {
  //   setChecked(props.setAllChecked ? true : false);
  //   setIndeterminate(false);
  // }, [props.vendorItemClasses]);

  const checkAllItems = (checked: boolean) => {
    setChecked(checked);
    const itemClasses = checked ? group.itemClasses!.reduce((prev, current) => prev.concat([current.itemClass!]), new Array<string>()) : [];
    setSelectedItemClasses(itemClasses);
    setItemClasses(itemClasses);
    setIndeterminate(false);
    setChecked(group.itemClasses!.length === itemClasses.length);
  };

  const onChange = (e: CheckboxValueType[]) => {
    let itemClasses = new Array<string>();
    e.forEach(ic => {
      const itemClass = find(props.group.itemClasses, itemClass => itemClass.itemClass === ic);
      if (itemClass) {
        itemClasses.push(itemClass.itemClass!);
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

  const setItemClasses = (itemClasses: string[]) => {
    if (vendorContext.selectedItemClasses.length) {
      const index = findIndex(vendorContext.selectedItemClasses, ic => ic.category === category);
      if (index >= 0) {
        vendorContext.selectedItemClasses[index] = { category: category, itemClasses };
      } else {
        vendorContext.selectedItemClasses.push({ category: category, itemClasses });
      }
    } else {
      vendorContext.selectedItemClasses = [{ category: category, itemClasses }];
    }
  };

  React.useEffect(() => {
    setSelectedItemClasses(vendorItemClasses);
    setIndeterminate(group.itemClasses!.length !== vendorItemClasses.length && vendorItemClasses.length > 0);
    setChecked(group.itemClasses!.length === vendorItemClasses.length);
    setItemClasses(vendorItemClasses);
  }, [vendorItemClasses, group]);

  return (
    <div>
      <Row>
        <Col>
          <Checkbox checked={checked} indeterminate={indeterminate} onChange={checkAll} style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Select All
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Checkbox.Group style={{ width: '100%' }} value={selectedItemClasses.reduce((prev, current) => prev.concat([current]), new Array<string>())} onChange={onChange}>
          {group.itemClasses!.map((collection: CategoryItemClass, collectionIndex: number) => {
            return (
              <Col key={collectionIndex} xs={24} sm={8} md={8} lg={6} xxl={4}>
                <Checkbox value={collection.itemClass}>
                  {collection.itemClassDescription} ({collection.itemClass})
                </Checkbox>
              </Col>
            );
          })}
        </Checkbox.Group>
      </Row>
    </div>
  );
});

export default ItemClassCollection;
