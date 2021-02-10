import React from 'react';
import { withRoute } from '../hoc-helpers';

const MainPage = () => {
  return <h2>Welcome to Star Wars database!</h2>;
};

export default withRoute({ path: '/', exact: true })(MainPage);
