import React from 'react';
const withChildren = (fn) => (Wrapper) => {
  return (props) => {
    return <Wrapper {...props}>{fn}</Wrapper>;
  };
};

export default withChildren;
