import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import Truncate from 'react-truncate';
import { useDispatch } from 'react-redux';
import TimeAgo from 'react-timeago';

import { fetchChatRoomAction } from '../ChatDux';
import './ChatList.scss';

const ChatItem = ({ chat, basePath }) => {
  const { chatRoomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatRoomId) {
      dispatch(fetchChatRoomAction({ chatRoomId }));
    }
  }, [chatRoomId]);

  return (
    <li role="row">
      <Link
        className={`columns is-marginless chatlist__item ${
          chat.chatRoomId === chatRoomId ? 'chatlist__item--selected' : ''
        }`}
        to={`${basePath}/${chat.chatRoomId}`}
      >
        <div className="column is-one-fifth">
          <Avatar color="grey" name={chat.dealerName} size={40} round="40px" />
        </div>
        <div className="column">
          <Truncate
            className="chatlist__name"
            lines={1}
            ellipsis={<span>...</span>}
          >
            {chat.dealerName}
          </Truncate>
          <Truncate
            className="chatlist__date"
            lines={1}
            ellipsis={<span>...</span>}
          >
            <TimeAgo
              title={(chat.createdAt * 1000).toLocaleString()}
              date={chat.createdAt * 1000}
            />
          </Truncate>
        </div>
        {/* TODO(#23): online status icon hardcoded */}
        <div className={`chatlist__status ${'chatlist__status--online'}`} />
        <div>Selling Amt: 2000</div>
        <div>Lowest Prices: $6.10</div>
        <div>
          <Truncate lines={1} ellipsis={<span>...</span>}>
            {chat.message}
          </Truncate>
        </div>
      </Link>
    </li>
  );
};

export default ChatItem;
