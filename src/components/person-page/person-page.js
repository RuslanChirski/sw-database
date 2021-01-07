import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import Record from '../record';

import './person-page.css';

export default class PersonPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedPerson: null,
    };
    this.swapiService = new SwapiService();
    this.changeSelectedPerson = (id) => {
      this.setState({
        selectedPerson: id,
      });
    };
  }

  render() {
    const { selectedPerson } = this.state;
    const { getPerson, getPersonImgUrl, getAllPeople } = this.swapiService;
    const itemList = (
      <ItemList onSelectItem={this.changeSelectedPerson} getData={getAllPeople}>
        {(i) => (
          <p>
            {i.name} (gender: {i.gender}, birthYear: {i.birthYear})
          </p>
        )}
      </ItemList>
    );
    const personDetails = (
      <ErrorBoundry>
        <ItemDetails currentItemId={selectedPerson} getData={getPerson} getImgUrl={getPersonImgUrl}>
          <Record field="name" label="Name" />
          <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
      </ErrorBoundry>
    );

    return <Row leftItem={itemList} rightItem={personDetails} />;
  }
}
