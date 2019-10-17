import React from 'react';

const PasswordStrengthProgressBar = ({ strength }) => {
  const classification = {
    '-1': {
      className: 'is-danger',
      label: 'Password is blank'
    },
    0: {
      className: 'is-danger',
      label: 'Too weak'
    },
    1: {
      className: 'is-danger',
      label: 'Too weak'
    },
    2: {
      className: 'is-danger',
      label: 'Too weak'
    },
    3: {
      className: 'is-warning',
      label: 'Could be stronger'
    },
    4: {
      className: 'is-success',
      label: 'Strong password'
    }
  };
  return (
    <div className="progress-bar">
      <progress
        className={`progress ${classification[strength].className}`}
        value={strength}
        max="4"
      />
      <span className="progress-bar__text">
        {classification[strength].label}
      </span>
    </div>
  );
};

export default PasswordStrengthProgressBar;
