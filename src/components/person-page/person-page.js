import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './person-page.css';

export default class PersonPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedPerson: null,
      hasError: false,
    };
    this.swapiService = new SwapiService();
    this.changeSelectedPerson = (id) => {
      this.setState({
        selectedPerson: id,
      });
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { selectedPerson, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList
            onSelectItem={this.changeSelectedPerson}
            getData={this.swapiService.getAllPeople}
          />
        </div>
        <div className="col-md-6">
          <PersonDetails currentPersonId={selectedPerson} />
        </div>
      </div>
    );
  }
}
