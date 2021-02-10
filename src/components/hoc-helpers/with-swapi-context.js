import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiContext = (mapMethodsToProps) => (Wrapped) => {
  return (props) => (
    <SwapiServiceConsumer>
      {(swapiService) => {
        const apiMethods = mapMethodsToProps(swapiService);
        return <Wrapped {...props} {...apiMethods} />;
      }}
    </SwapiServiceConsumer>
  );
};

export default withSwapiContext;
