import React from 'react';

import ItemDetails from '../item-details';
import Record from '../record';
import { withSwapiContext, withChildren, withDataAndUpdate, compose } from '../hoc-helpers';

const starshipRenderChildren = [
  <Record field="model" label="Model" key="model" />,
  <Record field="costInCredits" label="Cost in credits" key="costInCredits" />,
  <Record field="passengers" label="Passengers" key="passengers" />,
];

const mapMethodsToProps = ({ getStarship, getStarshipImgUrl }) => {
  return {
    getData: getStarship,
    getImgUrl: getStarshipImgUrl,
  };
};

export default compose(
  withSwapiContext(mapMethodsToProps),
  withDataAndUpdate,
  withChildren(starshipRenderChildren),
)(ItemDetails);
