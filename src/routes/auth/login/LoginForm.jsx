import React, { useReducer } from 'react';
import useForm from 'react-hook-form';

import 'assets/scss/checkmark.scss';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit: validateInputs, errors } = useForm();
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isPasswordShown: false,
    isLoading: false,
    loginErrorMessage: ''
  });

  const handleSubmit = form => {
    setState({ isLoading: true });
    onSubmit(form).catch(() => {
      setState({
        isLoading: false,
        loginErrorMessage: 'Incorrect username or password.'
      });
    });
  };

  const handleNotificationClose = () => {
    setState({
      loginErrorMessage: ''
    });
  };

  const togglePasswordShown = () => {
    setState({ isPasswordShown: !state.isPasswordShown });
  };

  return (
    <form className="form" noValidate onSubmit={validateInputs(handleSubmit)}>
      {state.loginErrorMessage && (
        <div className="notification is-danger">
          <button
            onClick={handleNotificationClose}
            aria-label="close notification"
            type="button"
            className="delete"
          />
          {state.loginErrorMessage}
        </div>
      )}
      <div className="form__field field">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <div className="control">
          <input
            id="email"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="text"
            name="email"
            placeholder="you@example.com"
            ref={register({
              required: 'Email address is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="help is-danger">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="form__field field">
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            id="password"
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type={state.isPasswordShown ? 'text' : 'password'}
            name="password"
            ref={register({
              required: 'Password is required'
            })}
          />
          <button
            tabIndex={-1}
            type="button"
            onClick={togglePasswordShown}
            className="form__field__icon show-password icon is-small is-right"
          >
            {state.isPasswordShown ? (
              <i className="fas fa-eye-slash" />
            ) : (
              <i className="fas fa-eye" />
            )}
          </button>
          {errors.password && (
            <p className="help is-danger">{errors.password.message}</p>
          )}
        </div>
      </div>
      <div className="login">
        <button
          type="submit"
          className={`login__button button ${
            state.isLoading ? 'is-loading' : ''
          }`}
        >
          Sign in
        </button>
        <div className="remember-me">
          <label className="checkbox b-contain">
            <span>Remember me</span>
            <input type="checkbox" />
            <div className="b-input" />
          </label>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
