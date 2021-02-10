import React, { Component } from 'react';

import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

const withDataAndUpdate = (View) => {
  return class extends Component {
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
      if (
        prevProps.currentItemId !== this.props.currentItemId ||
        prevProps.getData !== this.props.getData ||
        prevProps.getImgUrl !== this.props.getImgUrl
      ) {
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
      const { isError, isLoading, currentImg, currentItem } = this.state;
      if (isError) {
        return <ErrorIndicator />;
      }
      if (isLoading) {
        return <Loader />;
      }
      return <View {...this.props} currentImg={currentImg} currentItem={currentItem} />;
    }
  };
};

export default withDataAndUpdate;
