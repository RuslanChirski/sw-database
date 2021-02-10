import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = (props) => {
  const { onChangeService } = props;
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">SW Database</Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/peoples/">Peoples</Link>
        </li>
        <li>
          <Link to="/planets/">Planets</Link>
        </li>
        <li>
          <Link to="/starships/">Starships</Link>
        </li>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/secret'}>Secret Page</Link>
        </li>
      </ul>
      <button className="btn btn-primary btn-sm" onClick={onChangeService}>
        Change service
      </button>
    </div>
  );
};

export default Header;
