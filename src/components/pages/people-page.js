import React from 'react';
import { PeopleList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history }) => {
  return <PeopleList onSelectItem={(id) => history.push(id)} />;
};

export default withRouter(PeoplePage);
