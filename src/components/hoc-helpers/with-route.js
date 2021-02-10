import React from 'react';
import { Route } from 'react-router-dom';

const withRoute = ({ path = '/', exact = false }) => (Wrapped) => {
  return (props) => (
    <Route path={path} exact={exact}>
      <Wrapped {...props} />
    </Route>
  );
};

export default withRoute;
