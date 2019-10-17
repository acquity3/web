import React, { useReducer } from 'react';
import zxcvbn from 'zxcvbn';
import useForm from 'react-hook-form';

import PasswordStrengthProgressBar from './PasswordStrengthProgressBar';
import './SignupForm.scss';

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit: validateInputs,
    errors,
    watch,
    getValues,
    setError
  } = useForm({
    mode: 'onBlur'
  });
  const passwordField = watch('password', '');

  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isPasswordShown: false,
    isConfirmPasswordShown: '',
    isLoading: false
  });

  const handleSubmit = form => {
    setState({ isLoading: true });
    onSubmit(form).catch(() => {
      setError('email', 'invalid', 'Email is already currently in use');
      setState({
        isLoading: false
      });
    });
  };

  const togglePasswordShown = () => {
    setState({ isPasswordShown: !state.isPasswordShown });
  };

  const toggleConfirmPasswordShown = () => {
    setState({ isConfirmPasswordShown: !state.isConfirmPasswordShown });
  };

  const passwordConfirmValidation = value => {
    const { password } = getValues();
    return value === password || "Passwords don't match";
  };

  const passwordStrength =
    passwordField === '' ? -1 : zxcvbn(passwordField).score;

  return (
    <form className="form" noValidate onSubmit={validateInputs(handleSubmit)}>
      <div className="form__field field">
        <label htmlFor="fullname-field" className="label">
          Full name
        </label>
        <div className="control">
          <input
            id="fullname-field"
            className={`input ${errors.fullName ? 'is-danger' : ''}`}
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            name="fullName"
            ref={register({
              required: 'Full name is required'
            })}
          />

          {errors.fullName && (
            <p className="help is-danger">{errors.fullName.message}</p>
          )}
        </div>
      </div>
      <div className="form__field field">
        <label htmlFor="email-field" className="label">
          Email address
        </label>
        <div className="control">
          <input
            id="email-field"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="text"
            autoComplete="username"
            placeholder="you@example.com"
            name="email"
            ref={register({
              required: 'Email is required',
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
        <label htmlFor="password-field" className="label">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            id="password-field"
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type={state.isPasswordShown ? 'text' : 'password'}
            autoComplete="new-password"
            name="password"
            ref={register({
              required: 'Password is required',
              minLength: {
                value: 10,
                message: 'Password must be at least 10 characters'
              },
              validate: value =>
                zxcvbn(value).score >= 3 ||
                'Password is too weak. Try using uncommon words or inside jokes, non-standard uPPercasing, creative spelllling, and non-obvious numbers and symbols'
            })}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordShown}
            className="show-password form__field__icon icon is-small is-right"
          >
            {state.isPasswordShown ? (
              <i className="fas fa-eye-slash" />
            ) : (
              <i className="fas fa-eye" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="help is-danger">{errors.password.message}</p>
        )}
        {passwordField === '' && !errors.password && (
          <p className="help">
            The password must contain at least 10 characters
          </p>
        )}
        <PasswordStrengthProgressBar strength={passwordStrength} />
      </div>
      <div className="form__field field">
        <label htmlFor="confirm-password-field" className="label">
          Confirm password
        </label>
        <div className="control has-icons-right">
          <input
            id="confirm-password-field"
            className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
            type={state.isConfirmPasswordShown ? 'text' : 'password'}
            autoComplete="new-password"
            name="confirmPassword"
            ref={register({
              required: 'Password confirmation is required',
              validate: passwordConfirmValidation
            })}
          />
          <button
            tabIndex={-1}
            type="button"
            onClick={toggleConfirmPasswordShown}
            className="show-password form__field__icon icon is-small is-right"
          >
            {state.isConfirmPasswordShown ? (
              <i className="fas fa-eye-slash" />
            ) : (
              <i className="fas fa-eye" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="help is-danger">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="auth-actions">
        <button
          type="submit"
          className={`auth-actions__button button--cta button hvr-grow ${
            state.isLoading ? 'is-loading' : ''
          }`}
        >
          Register now
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
