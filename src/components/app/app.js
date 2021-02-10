import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { MainPage, PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from '../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import { PersonDetails, StarshipDetails } from '../sw-components';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRandomPlanet: false,
      apiService: new SwapiService(),
      isLogged: false,
    };
    this.toggleIsLogged = () => {
      this.setState(({ isLogged }) => {
        return {
          isLogged: !isLogged,
        };
      });
    };
    this.toggleRandomPlanet = () => {
      this.setState(({ showRandomPlanet }) => {
        return {
          showRandomPlanet: !showRandomPlanet,
        };
      });
    };

    this.onChangeService = () => {
      this.setState(({ apiService }) => {
        const Service = apiService instanceof SwapiService ? DummySwapiService : SwapiService;
        console.log(`new service is ${Service.name}`);
        return {
          apiService: new Service(),
        };
      });
    };
  }

  render() {
    const { showRandomPlanet, apiService, isLogged } = this.state;
    const planet = showRandomPlanet ? <RandomPlanet updateInterval={2000} /> : null;

    return (
      <ErrorBoundry>
        <Router>
          <SwapiServiceProvider value={apiService}>
            <div className="stardb-app">
              <Header onChangeService={this.onChangeService} />
              {planet}
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
              <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/peoples" exact component={PeoplePage} />
                <Route
                  path={'/peoples/:id'}
                  render={({ match }) => {
                    const { id } = match.params;
                    return <PersonDetails currentItemId={id} />;
                  }}
                />
                <Route path="/starships/" exact component={StarshipsPage} />
                <Route
                  path={'/starships/:id'}
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails currentItemId={id} />;
                  }}
                />
                <Route path="/planets/:id?" component={PlanetsPage} />
                <Route path="/secret" render={() => <SecretPage isLogged={isLogged} />} />
                <Route
                  path="/login"
                  render={() => <LoginPage isLogged={isLogged} login={this.toggleIsLogged} />}
                />
                <Route render={() => <h2>This page in not found!</h2>} />
              </Switch>
            </div>
          </SwapiServiceProvider>
        </Router>
      </ErrorBoundry>
    );
  }
}
