import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../loader';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

// Компонент для логики
class RandomPlanet extends Component {
  constructor(props) {
    super(props);
    this.apiService = new SwapiService();
    this.state = {
      planet: {},
      loading: true,
      error: false,
    };
    // Функция которая будет вызываться, когда придут данные с сервера
    this.onDataLoaded = (planet) => {
      this.setState({
        planet,
      });
    };
    this.onError = (error) => {
      this.setState({
        error: true,
      });
    };
    this.updatePlanet = () => {
      const id = Math.floor(Math.random() * 25) + 2;
      this.apiService
        .getPlanet(id)
        .then(this.onDataLoaded)
        .catch(this.onError)
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    };
  }

  // Получение данных с сервера

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { planet, loading, error } = this.state;
    // Если loading или error == false, то выражение вернет false, но т.к. мы возвращаем противолопожное
    // значение, то вернется true
    const hasData = !(loading || error);
    // Если значение ровно null, то оно никак не отображается
    const loader = loading ? <Loader /> : null;
    const content = hasData ? <PlanetContent planet={planet} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {loader}
        {content}
        {errorMessage}
      </div>
    );
  }
}
RandomPlanet.propTypes = {
  updateInterval: PropTypes.number,
};
export default RandomPlanet;

// Локальный для рендеринга который используется только тут
const PlanetContent = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        alt={`Planet: ${name}`}
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
