import React, { Component } from 'react';

import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: true,
        isError: false,
      };
    }

    update() {
      this.props
        .getData()
        .then((data) =>
          this.setState({
            data,
          }),
        )
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

    componentDidMount() {
      this.update();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.getData !== this.props.getData) {
        this.update();
      }
    }

    render() {
      const { data, isLoading, isError } = this.state;

      if (isLoading) {
        return <Loader />;
      }

      if (isError) {
        return <ErrorIndicator {...this.props} />;
      }

      return <View {...this.props} itemsList={data} />;
    }
  };
};

export default withData;
