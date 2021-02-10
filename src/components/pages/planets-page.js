import React from 'react';
import { PlanetList, PlanetDetails } from '../sw-components';
import { withRouter } from 'react-router-dom';
import Row from '../row';

const PlanetsPage = ({ history, match }) => {
  const { id } = match.params;
  return (
    <Row
      leftItem={<PlanetList onSelectItem={(id) => history.push(id)} />}
      rightItem={<PlanetDetails currentItemId={id} />}
    />
  );
};

export default withRouter(PlanetsPage);
