import React from 'react';

import './ChatHeader.scss';

const ChatDefaultHeader = ({ setHeader }) => {
  return (
    <div className="chat__offer__actions columns is-gapless is-mobile">
      <button
        type="button"
        className="column button is-success is-outlined"
        onClick={() => setHeader(1)}
      >
        Make Offer
      </button>
      <button type="button" className="column button is-danger is-outlined">
        Cancel Match
      </button>
    </div>
  );
};

export default ChatDefaultHeader;
