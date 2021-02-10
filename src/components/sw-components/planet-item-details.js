import React from 'react';

import ItemDetails from '../item-details';
import Record from '../record';
import { withSwapiContext, withChildren, withDataAndUpdate, compose } from '../hoc-helpers';

const planetRenderChildren = [
  <Record field="diameter" label="Diameter" key="diameter" />,
  <Record field="population" label="Population" key="population" />,
];

const mapMethodsToProps = ({ getPlanet, getPlanetImgUrl }) => {
  return {
    getData: getPlanet,
    getImgUrl: getPlanetImgUrl,
  };
};

export default compose(
  withSwapiContext(mapMethodsToProps),
  withDataAndUpdate,
  withChildren(planetRenderChildren),
)(ItemDetails);
