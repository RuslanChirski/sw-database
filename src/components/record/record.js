import React from 'react';
import './record.css';

const Record = ({ item, field, label, key }) => {
  return (
    <li className="list-group-item" key={key}>
      <span className="term">{label}:</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default Record;
