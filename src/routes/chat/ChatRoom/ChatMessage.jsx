import React from 'react';
import TimeAgo from 'react-timeago';

import Avatar from 'components/avatar';
import './ChatRoom.scss';

const ChatMessage = ({ chat }) => {
  return (
    <div className="columns is-marginless is-mobile">
      <div className="column">
        <div className="columns is-mobile chatroom__window">
          <div className="column is-2">
            <div>
              <Avatar userName={chat.authorName} />
            </div>
          </div>
          <div className="column">
            <div className="columns is-marginless is-mobile">
              <div className="column is-8">{chat.authorName}</div>
              <div className="column chatroom__date">
                <TimeAgo
                  title={(chat.createdAt * 1000).toLocaleString()}
                  date={chat.createdAt * 1000}
                />
              </div>
            </div>
            <div className="column">
              <div>{chat.message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
