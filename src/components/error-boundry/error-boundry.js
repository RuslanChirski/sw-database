import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

import './error-boundry.css';

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  componentDidCatch() {
    this.setState({
      isError: true,
    });
  }

  render() {
    const { isError } = this.state;

    if (isError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}
