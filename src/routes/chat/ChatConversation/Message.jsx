import React from 'react';

import './ChatMessage.scss';

const Message = ({ chat, timeString }) => {
  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        {chat.message}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

export default Message;
