import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PersonPage from '../person-page';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import Record from '../record';

import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showRandomPlanet: false,
    };
    this.swapiService = new SwapiService();
    this.toggleRandomPlanet = () => {
      this.setState(({ showRandomPlanet }) => {
        return {
          showRandomPlanet: !showRandomPlanet,
        };
      });
    };
  }

  render() {
    const { showRandomPlanet } = this.state;
    const { getStarship, getPlanet, getPlanetImgUrl, getStarshipImgUrl } = this.swapiService;
    const planet = showRandomPlanet ? <RandomPlanet /> : null;

    const planetItemList = (
      <ItemList onSelectItem={this.changeSelectedPerson} getData={this.swapiService.getAllPlanets}>
        {(i) => (
          <p>
            {i.name} (population: {i.population}, diameter: {i.diameter})
          </p>
        )}
      </ItemList>
    );
    const planetDetails = (
      <ItemDetails currentItemId={3} getData={getPlanet} getImgUrl={getPlanetImgUrl}>
        <Record field="diameter" label="Diameter" />
        <Record field="population" label="Population" />
      </ItemDetails>
    );

    const starshipItemList = (
      <ItemList
        onSelectItem={this.changeSelectedPerson}
        // Добавляем в компонент функцию, которая будет получать данные с сервера, до этого внутри
        // компонента создавался инстанс класса apiService
        getData={this.swapiService.getAllStarships}
      >
        {(i) => (
          <p>
            {i.name} (crew: {i.crew}, passengers: {i.passengers}
          </p>
        )}
      </ItemList>
    );
    const starshipDetails = (
      <ItemDetails currentItemId={5} getData={getStarship} getImgUrl={getStarshipImgUrl}>
        <Record field="model" label="Model" />
        <Record field="costInCredits" label="Cost in credits" />
        <Record field="passengers" label="Passengers" />
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {planet}
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <PersonPage />
          {/*Блок Planets*/}
          <Row leftItem={planetItemList} rightItem={planetDetails} />
          {/*Блок starships*/}
          <Row leftItem={starshipItemList} rightItem={starshipDetails} />
        </div>
      </ErrorBoundry>
    );
  }
}
