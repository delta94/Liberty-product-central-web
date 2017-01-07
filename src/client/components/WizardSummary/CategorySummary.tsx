import * as React from 'react';
import { UserJobCategory } from 'graphql';
import { Row, Col } from 'antd';
import { ICategory } from '@/routes/corporate/Wizard/categories';
import styles from './index.module.scss';

export interface ICategorySummaryProps {
  category: ICategory;
  userCategory: UserJobCategory;
  img: string;
}

export default (props: ICategorySummaryProps) => {
  return (
    <Row gutter={24} style={{ marginBottom: 40 }}>
      <Col xs={24} sm={7}>
        <div
          style={{
            backgroundImage: `url('${props.img}')`,
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
          }}
        >
          <img
            src={props.img}
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
                backgroundColor: 'rgba(255,255,255,1)',
                color: '#383c4f',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              {props.category.category}
            </div>
          </div>
        </div>
      </Col>
      <Col xs={24} sm={17} className={styles.list}>
        <Row type="flex" justify="start" className={styles.download} style={{ marginBottom: '10px' }}>
          <Col className={styles.description}>Your {props.category.category} Download Includes the Following:</Col>
        </Row>
        <Row className={styles.list}>
          {props.userCategory.userJobCategoryItemClasses!.map((collection: any, collectionIndex: number) => {
            return (
              <Col key={collectionIndex} xs={24} sm={6} style={{ textAlign: 'left' }}>
                {collection.itemClassDescription} ({collection.itemClass})
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};
