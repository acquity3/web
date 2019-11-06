import React from 'react';
import { useSelector } from 'react-redux';
import Offer from './Offer';
import Message from './Message';

import './ChatMessage.scss';

const Conversation = ({ chat }) => {
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  const userType = useSelector(state => state.misc.userType);
  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          chat.userType === userType ? 'right' : 'left'
        }`}
      >
        {chat.type === 'message' ? (
          <Message
            chat={chat}
            timeString={timeString}
            chatUserType={chat.userType}
          />
        ) : (
          <Offer
            chat={chat}
            timeString={timeString}
            chatUserType={chat.userType}
          />
        )}
      </div>
    </div>
  );
};

export default Conversation;
