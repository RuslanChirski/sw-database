import React from 'react';
import PropTypes from 'prop-types';
import './item-list.css';

const ItemList = (props) => {
  const { onSelectItem, itemsList, children: renderLabel } = props;
  const items = itemsList.map((item) => {
    const { id } = item;
    const name = renderLabel(item);
    return (
      <li className="list-group-item" key={id} onClick={() => onSelectItem(id)}>
        {name}
      </li>
    );
  });
  return <ul className="item-list list-group">{items}</ul>;
};

ItemList.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
  itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default ItemList;
