import React, { Component } from 'react';
import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

class ItemList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   itemsList: null,
    //   isLoading: true,
    //   isError: false,
    // };
  }

  // componentDidMount() {
  //   const { getData } = this.props;
  //   getData()
  //     .then((itemsList) =>
  //       this.setState({
  //         itemsList,
  //       }),
  //     )
  //     .catch(() => {
  //       this.setState({
  //         isError: true,
  //       });
  //     })
  //     .finally(() => {
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  // }

  // renderItem(itemList) {
  //   const { onSelectItem } = this.props;
  //   const items = itemList.map((item) => {
  //     return (
  //       <li className="list-group-item" key={item.id} onClick={() => onSelectItem(item.id)}>
  //         {this.props.children(item)}
  //       </li>
  //     );
  //   });
  //
  //   return <ul className="item-list list-group">{items}</ul>;
  // }

  render() {
    const { itemsList, isLoading, isError } = this.state;
    const { onSelectItem } = this.props;

    function renderItem() {
      const items = itemsList.map((item) => {
        return (
          <li className="list-group-item" key={item.id} onClick={() => onSelectItem(item.id)}>
            {this.props.children(item)}
          </li>
        );
      });

      return <ul className="item-list list-group">{items}</ul>;
    }

    const hasData = !(isLoading || isError);

    const loader = isLoading ? <Loader /> : null;
    const error = isError ? <ErrorIndicator /> : null;
    const content = hasData ? renderItem() : null;

    return (
      <React.Fragment>
        {loader}
        {error}
        {content}
      </React.Fragment>
    );
  }
}

const withData = () => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: true,
        isError: false,
      };
    }

    componentDidMount() {
      const { getData } = this.props;
      getData()
        .then((data) =>
          this.setState({
            data,
          }),
        )
        .catch(() => {
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
      return <ItemList {...this.props} />;
    }
  };
};

export default withData();
