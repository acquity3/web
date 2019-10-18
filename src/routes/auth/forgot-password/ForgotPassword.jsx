import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import AuthArt from 'components/svgr/AuthArt';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isSubmitting: false,
    requestMessage: '',
    isSuccessfulRequest: false
  });

  const handleFormSubmit = _data => {
    setState({ isSubmitting: true });
    // Mock db call
    setTimeout(() => {
      setState({
        isSubmitting: false,
        requestMessage:
          'A password reset link has been sent to the given email address and should arrive in a few minutes!',
        isSuccessfulRequest: true
      });
    }, 1000);
  };

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
              <div className="content-container">
                <h1 className="form-title">Reset password</h1>
                <div className="form-wrapper">
                  <div className="content">
                    Forgot your password? We will send password reset
                    instructions to your email address below.
                  </div>
                  {state.requestMessage && (
                    <div
                      className={`content has-text-${
                        state.isSuccessfulRequest ? 'success' : 'danger'
                      }`}
                    >
                      {state.requestMessage}
                    </div>
                  )}
                  {state.isSuccessfulRequest ? (
                    <div>
                      <Link to="/">Go back to home page</Link>
                    </div>
                  ) : (
                    <>
                      <ForgotPasswordForm
                        onSubmit={handleFormSubmit}
                        isSubmitting={state.isSubmitting}
                      />

                      <div className="actions">
                        <div>
                          <span className="text">Back to </span>
                          <Link to="/login">log in</Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
