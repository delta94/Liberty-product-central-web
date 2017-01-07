import React, { Suspense, LazyExoticComponent } from 'react';
import ErrorBoundary from '../ErrorBoundary';

export default (Component: LazyExoticComponent<any>) => {
  return (props: any) => (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
