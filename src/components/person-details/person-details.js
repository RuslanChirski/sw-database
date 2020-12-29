import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './person-details.css';

export default class PersonDetails extends Component {
  constructor() {
    super();
    this.swapiService = new SwapiService();
    this.state = {
      currentPerson: null,
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPersonId !== this.props.currentPersonId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { currentPersonId } = this.props;
    if (!currentPersonId) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    this.swapiService
      .getPerson(currentPersonId)
      .then((person) => {
        this.setState({ currentPerson: person });
      })
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
    const { isLoading, isError, currentPerson } = this.state;
    const hasData = !(isLoading || isError);

    const error = isError ? <ErrorIndicator /> : null;
    const loader = isLoading ? <Loader /> : null;
    const content = hasData ? <PersonDetailsContent currentPerson={currentPerson} /> : null;

    return (
      <div className="person-details card">
        {error}
        {loader}
        {content}
      </div>
    );
  }
}

const PersonDetailsContent = (props) => {
  if (!props.currentPerson) {
    return <span>Please select a person from list</span>;
  }
  const { name, id, birthYear, eyeColor, gender } = props.currentPerson;
  return (
    <React.Fragment>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
