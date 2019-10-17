import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import AuthArt from 'components/svgr/AuthArt';
import SignupForm from './SignupForm';

const Signup = () => {
  const { register } = useAuth();

  return (
    <div className="columns is-marginless is-centered">
      <div className="column is-two-thirds-desktop is-four-fifths-tablet is-full-mobile">
        <div className="columns is-variable is-6">
          <div className="column is-half is-hidden-mobile">
            <div className="art-container">
              <AuthArt />
            </div>
          </div>
          <div className="column is-half">
            <div className="content-container">
              <h1 className="form-title">Sign Up</h1>
              <div className="form-wrapper">
                <SignupForm onSubmit={register} />
              </div>

              <div className="actions">
                <div className="has-text-centered">
                  <span className="text">Already a member? </span>
                  <Link to="/login">Log in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
