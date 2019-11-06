import React from 'react';

const SuccessMessage = ({
  message = 'Action has been successfully performed',
  className = ''
}) => {
  return (
    <article className={`${className} successMessage message is-success`}>
      <div className="successMessage__message message-body">{message}</div>
    </article>
  );
};

export default SuccessMessage;
