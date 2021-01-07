export default class SwapiService {
  constructor() {
    this._baseUrl = 'https://swapi.dev/api/';
    this._baseImgUrl = 'https://starwars-visualguide.com/assets/img';

    this.getResource = async (url) => {
      const fullUrl = `${this._baseUrl}${url}`;
      const res = await fetch(fullUrl);

      if (!res.ok) {
        throw new Error(`Could not fetch ${fullUrl}, received ${res.status}`);
      }

      return await res.json();
    };

    this.getAllPeople = async () => {
      const { results } = await this.getResource('people');
      return results.map((person) => this._transformPerson(person));
    };

    this.getPerson = async (id) => {
      const person = await this.getResource(`people/${id}`);
      return this._transformPerson(person);
    };

    this.getAllPlanets = async () => {
      const { results } = await this.getResource('planets');
      return results.map((planet) => this._transformPlanet(planet));
    };

    this.getPlanet = async (id) => {
      const response = await this.getResource(`planets/${id}`);
      return this._transformPlanet(response);
    };

    this.getAllStarships = async () => {
      const { results } = await this.getResource('starships/');
      return results.map((starship) => this._transformStarship(starship));
    };

    this.getStarship = async (id) => {
      const response = await this.getResource(`starships/${id}`);
      return this._transformStarship(response);
    };

    this.getPersonImgUrl = ({ id }) => {
      return `${this._baseImgUrl}/characters/${id}.jpg`;
    };
    this.getStarshipImgUrl = ({ id }) => {
      return `${this._baseImgUrl}/starships/${id}.jpg`;
    };
    this.getPlanetImgUrl = ({ id }) => {
      return `${this._baseImgUrl}/planets/${id}.jpg`;
    };
  }

  _extractId(url) {
    const regExp = /\/([0-9]*)\/$/;
    return url.match(regExp)[1];
  }
  _transformPlanet(planet) {
    return {
      id: this._extractId(planet.url),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  }
  _transformPerson(person) {
    return {
      id: this._extractId(person.url),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  }
  _transformStarship(starship) {
    return {
      id: this._extractId(starship.url),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  }
}
