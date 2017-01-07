import './LoadingSpinner.scss';
import { Spin } from 'antd';
import * as React from 'react';

export interface LoadingSpinnerProps {
  tip?: string;
  spinning?: boolean;
}

const LoadingSpinner: React.SFC<LoadingSpinnerProps> = props => {
  return (
    <Spin spinning={props.spinning ? props.spinning : true} size="large" tip={props.tip ? props.tip : 'Loading.. Please Wait.'}>
      <div style={{ minWidth: '100vw', minHeight: '100vh' }} />
    </Spin>
  );
};

export default LoadingSpinner;
