import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import LoginArt from 'components/svgr/LoginArt';
import LoginForm from './LoginForm';

import './Login.scss';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="columns is-centered is-vertically-centered">
      <div className="column is-four-fifths-tablet is-full-mobile">
        <div className="columns">
          <div className="column is-half is-hidden-mobile">
            <div className="art-container">
              <LoginArt />
            </div>
          </div>
          <div className="column is-half">
            <div className="content-container">
              <h1 className="form-title">Log in</h1>
              <div className="form-wrapper">
                <LoginForm onSubmit={login} />
              </div>
              <div className="has-text-centered">
                <span>Don&apos;t have an account yet? </span>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
