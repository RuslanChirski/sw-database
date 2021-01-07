import React, { Component } from 'react';
import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './item-details.css';

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null,
      currentImg: null,
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentItemId !== this.props.currentItemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { currentItemId, getData, getImgUrl } = this.props;
    if (!currentItemId) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    // Делаем запрос на сервер с помощью функции getData (тело которой передаем через props), когда
    // приходит ответ, мы устанавливаем current item и currentImg с помощью функции getImgUrl (тело
    // которой мы так же передаем через props)
    getData(currentItemId)
      .then((item) => {
        this.setState({
          currentItem: item,
          currentImg: getImgUrl(item),
        });
      })
      .catch((e) => {
        console.log(e);
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
    const { isLoading, isError, currentItem, currentImg } = this.state;
    const hasData = !(isLoading || isError);

    const error = isError ? <ErrorIndicator /> : null;
    const loader = isLoading ? <Loader /> : null;
    const content = hasData ? (
      <PersonDetailsContent currentItem={currentItem} image={currentImg}>
        {this.props.children}
      </PersonDetailsContent>
    ) : null;

    return (
      <div className="person-details card">
        {error}
        {loader}
        {content}
      </div>
    );
  }
}

const PersonDetailsContent = ({ currentItem, image, children }) => {
  if (!currentItem) {
    return <span>Please select a person from list</span>;
  }

  const { name } = currentItem;

  return (
    <React.Fragment>
      <img className="person-image" src={image} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item: currentItem });
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};
