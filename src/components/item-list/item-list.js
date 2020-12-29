import React, { Component } from 'react';
import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      itemsList: null,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((itemsList) =>
        this.setState({
          itemsList,
        }),
      )
      .catch((err) => {
        this.setState({
          isError: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { itemsList, isLoading, isError } = this.state;
    const { onSelectItem } = this.props;

    const hasData = !(isLoading || isError);

    const loader = isLoading ? <Loader /> : null;
    const error = isError ? <ErrorIndicator /> : null;
    const content = hasData ? <ListContent list={itemsList} onClickHandler={onSelectItem} /> : null;

    return (
      <React.Fragment>
        {loader}
        {error}
        {content}
      </React.Fragment>
    );
  }
}

const ListContent = ({ list, onClickHandler }) => {
  const personsForRender = list.map((person) => {
    return (
      <li className="list-group-item" key={person.id} onClick={() => onClickHandler(person.id)}>
        {person.name}
      </li>
    );
  });
  return <ul className="item-list list-group">{personsForRender}</ul>;
};
