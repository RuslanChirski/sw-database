import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PersonPage from '../person-page';

import './app.css';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

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
    const { showRandomPlanet, selectedPerson } = this.state;
    const planet = showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div>
        <Header />
        {planet}
        <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <PersonPage />
        {/* Блок Planets*/}
        <div className="row mb2 mt-3">
          <div className="col-md-6">
            <ItemList
              onSelectItem={this.changeSelectedPerson}
              getData={this.swapiService.getAllPlanets}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails currentPersonId={selectedPerson} />
          </div>
        </div>
        {/*Блок starships*/}
        <div className="row mb2 mt-3">
          <div className="col-md-6">
            <ItemList
              onSelectItem={this.changeSelectedPerson}
              getData={this.swapiService.getALlStarships}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails currentPersonId={selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}
