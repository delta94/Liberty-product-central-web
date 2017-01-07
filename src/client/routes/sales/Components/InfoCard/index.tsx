import * as React from 'react';
import GetPresentation from './GetPresentation';
import { Card, Button } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { SalesPresentationContext } from '../../SalesPresentationContext';
import { SalesPresentation } from 'graphql';

export interface IInfoCardProps extends RouteComponentProps<any> {
  presentation?: SalesPresentation;
}

const InfoCard: React.FunctionComponent<IInfoCardProps> = props => {
  const context = React.useContext(SalesPresentationContext);
  context.setPresentation(props.presentation);

  return (
    <Card className="kit-item" size="small" title="Presentation Summary" style={{ width: 300 }}>
      <div>Name: {context.name}</div>
      <div>Customer: {context.customer.name}</div>
      {context.itemClasses.length === 0 ? (
        <div>Item Classes: 0</div>
      ) : (
        <div>
          Item Classes:{' '}
          {context.itemClasses.map((ic, index) => (
            <div key={index}>
              {ic.itemClass}{' '}
              <Button
                type="link"
                onClick={() => {
                  context.itemClassIndex = index;
                  localStorage.setItem('idx', index.toString());
                  props.history.push(`/sales-presentations/wizard/step-2/${ic.itemClass}`);
                  //window.location.href = `/sales-presentations/wizard/step-2/${ic.itemClass}`;
                }}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default withRouter<IInfoCardProps, any>(GetPresentation(InfoCard));
