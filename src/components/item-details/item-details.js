import React from 'react';

import './item-details.css';

const ItemDetails = ({ currentItem, currentImg, children }) => {
  if (!currentItem) {
    return (
      <div className="person-details card">
        <p>Please select a person from list</p>
      </div>
    );
  }

  return (
    <div className="person-details card">
      <img className="person-image" src={currentImg} alt="planet" />
      <div className="card-body">
        <h4>{currentItem.name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item: currentItem });
          })}
        </ul>
      </div>
    </div>
  );
};

export default ItemDetails;
