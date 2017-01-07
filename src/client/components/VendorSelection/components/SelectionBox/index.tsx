import * as React from 'react';
import styles from './index.module.scss';
import { IVendorSelectionItem } from '../..';

export interface SelectionBoxProps {
  onClick: (item: IVendorSelectionItem) => void;
  vendor: IVendorSelectionItem;
  vendorLogo?: string;
}

export function SelectionBox(props: SelectionBoxProps) {
  const img = props.vendor.image ? require(`assets/img/resellers/${props.vendor.image}`) : null;
  return (
    <>
      <div className={styles.wrapper} onClick={() => props.onClick(props.vendor)}>
        <div
          style={{
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'middle',
          }}
        />
        {props.vendor.image && <img src={img} style={{ maxWidth: '100%' }} alt="" />}
      </div>
    </>
  );
}
