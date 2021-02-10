import React from 'react';

import ItemDetails from '../item-details';
import Record from '../record';
import { withSwapiContext, withDataAndUpdate, withChildren, compose } from '../hoc-helpers';

const personRenderChildren = [
  <Record field="gender" label="Gender" key="gender" />,
  <Record field="eyeColor" label="Eye color" key="eyeColor" />,
];

const mapMethodsToProps = ({ getPerson, getPersonImgUrl }) => {
  return {
    getData: getPerson,
    getImgUrl: getPersonImgUrl,
  };
};

export default compose(
  withSwapiContext(mapMethodsToProps),
  withDataAndUpdate,
  withChildren(personRenderChildren),
)(ItemDetails);
