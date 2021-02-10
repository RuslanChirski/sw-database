import React from 'react';

import ItemList from '../item-list';
import { withData, withChildren, withSwapiContext, compose } from '../hoc-helpers';

// Render functions для itemlists
const renderModelAndName = ({ model, name }) => (
  <p>
    {name} (model: {model})
  </p>
);
const renderGenderAndName = ({ gender, name }) => (
  <p>
    {name} (gender: {gender})
  </p>
);
const renderDiameterAndName = ({ diameter, name }) => (
  <p>
    {name} (diameter: {diameter})
  </p>
);

// mapMethodsToProps

const planetMapMethodsToProps = ({ getAllPlanets }) => {
  return {
    getData: getAllPlanets,
  };
};
const peopleMapMethodsToProps = ({ getAllPeople }) => {
  return {
    getData: getAllPeople,
  };
};
const starshipMapMethodsToProps = ({ getAllStarships }) => {
  return {
    getData: getAllStarships,
  };
};

// Используем композицию функций для вложенной оберки

const PlanetList = compose(
  withSwapiContext(planetMapMethodsToProps),
  withData,
  withChildren(renderDiameterAndName),
)(ItemList);

const PeopleList = compose(
  withSwapiContext(peopleMapMethodsToProps),
  withData,
  withChildren(renderGenderAndName),
)(ItemList);

const StarshipList = compose(
  withSwapiContext(starshipMapMethodsToProps),
  withData,
  withChildren(renderModelAndName),
)(ItemList);

export { PlanetList, PeopleList, StarshipList };
