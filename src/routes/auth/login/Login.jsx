import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import LoginArt from 'components/svgr/LoginArt';
import LoginForm from './LoginForm';

import './Login.scss';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="columns is-marginless is-centered">
      <div className="column is-two-thirds-desktop is-four-fifths-tablet is-full-mobile">
        <div className="columns is-variable is-6">
          <div className="column is-half is-hidden-mobile">
            <div className="art-container">
              <LoginArt />
            </div>
          </div>
          <div className="column is-half">
            <div className="content-container">
              <h1 className="form-title">Sign In</h1>
              <div className="form-wrapper">
                <LoginForm onSubmit={login} />
              </div>

              <div className="actions">
                <Link className="actions__forgetpassword" to="/forgot-password">
                  Forgot your password?
                </Link>
                <Link className="actions__signup" to="/signup">
                  Don&apos;t have an account yet? Sign up here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
