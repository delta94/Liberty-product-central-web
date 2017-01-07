import * as React from 'react';
import { Row, Col } from 'antd';
import cn from 'classnames';
// import { ReactComponent as CatalogIcon } from '../../../assets/img/svgs/CatalogIcon.svg';
import { ReactComponent as CatalogImageLinkIcon } from '../../../assets/img/svgs/CatalogImageLinkIcon.svg';
// import { ReactComponent as ImageLinkIcon } from '../../../assets/img/svgs/ImageLinkIcon.svg';
import { ReactComponent as ImageIcon } from '../../../assets/img/svgs/ImageIcon.svg';
import styles from './index.module.scss';
import './index.scss';

export interface ProductFileTypeProps {
  setFileType: (fileType: string) => void;
  fileType: string;
  next: (fileType: string) => void;
}

export function ProductFileType(props: ProductFileTypeProps) {
  const [selected, setSelected] = React.useState('');

  React.useEffect(() => {
    setSelected(props.fileType);
  }, [props.fileType]);

  const handleClick = (fileType: string) => {
    props.setFileType(fileType);
    props.next(fileType);
  };

  const getClasses = (fileType: string): string => {
    let baseClass = styles.selectionColumn;
    const isSelected = selected === fileType;
    return cn(baseClass, { [`${styles.active}`]: isSelected, active: isSelected });
  };

  return (
    <div className={styles.wrapper}>
      <Row>
        <Col offset={1} xs={24} sm={10} className={cn(getClasses('Product Data + Image Links'), 'row-class')} onClick={() => handleClick('Product Data + Image Links')}>
          <CatalogImageLinkIcon style={{ height: 70 }} />
          <span>Product Data + Image Links</span>
        </Col>

        <Col offset={1} xs={24} sm={10} className={cn(getClasses('Images Only'), 'row-class')} onClick={() => handleClick('Images Only')}>
          <ImageIcon style={{ height: 70 }} />
          <span>Images Only</span>
        </Col>
      </Row>
    </div>
  );
}
