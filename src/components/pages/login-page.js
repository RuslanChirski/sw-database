import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = (props) => {
  const { login, isLogged } = props;
  if (isLogged) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <p>Login to see secret page!</p>
      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
