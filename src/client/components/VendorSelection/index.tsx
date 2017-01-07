import * as React from 'react';
import { Row, Col } from 'antd';
import { SelectionBox } from './components/SelectionBox';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface VendorSelectionProps {
  next: (vendor: IVendorSelectionItem) => void;
}

export interface IVendorSelectionItem {
  name: string;
  image: string;
  path?: string;
}

const vendors: IVendorSelectionItem[] = [
  {
    name: 'Amazon',
    image: 'Amazon-Logo.png',
  },
  {
    name: 'Bellacor',
    image: 'BellacorStackedPro-Logo.png',
  },
  {
    name: 'Cymax',
    image: 'Cymax-Logo-Transparent.png',
  },
  {
    name: 'Overstock',
    image: 'Overstock-Logo.png',
  },
  {
    name: 'Purchasing Power',
    image: 'PurchasingPower-Logo.png',
  },
  {
    name: 'Raymour Flanigan',
    image: 'RaymourFlanigan-Logo.png',
  },
  {
    name: 'Slumberland',
    image: 'SlumberlandFurniture-Logo.png',
  },
  {
    name: 'Walmart',
    image: 'Walmart-Logo.png',
  },
  {
    name: 'Wayfair',
    image: 'Wayfair-Logo.png',
  },
  {
    name: 'Woodstock Furniture',
    image: 'WoodstockFurniture-Logo.png',
  },
  {
    name: 'Admin',
    image: 'AdminCog.png',
    path: '/corporate/administration',
  },
];

const VendorSelection = function(props: VendorSelectionProps & RouteComponentProps<any>) {
  const next = (item: IVendorSelectionItem) => {
    props.next(item);
  };

  return (
    <div>
      <Row type="flex" justify="start" style={{ maxWidth: 1200, margin: '20PX auto 0 auto' }}>
        {vendors.map(vendor => {
          return (
            <Col xs={24} sm={6} style={{ fontWeight: 700, fontSize: 24, padding: 10 }}>
              <SelectionBox onClick={next} vendor={vendor} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default withRouter(VendorSelection);
