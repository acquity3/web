import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import Avatar from 'components/avatar';

import ChatArchiveButton from './ChatArchiveButton';
import './ChatRoom.scss';

const ChatRoom = ({ chat, basePath }) => {
  const { chatRoomId } = useParams();

  const formatter = (value, unit, _suffix) => {
    let shortenedUnit;
    switch (unit) {
      case 'second':
      case 'minute':
      case 'hour':
      case 'day':
      case 'week':
      case 'year':
        shortenedUnit = unit.charAt(0);
        break;
      case 'month':
        shortenedUnit = 'mo';
        break;
      default:
        shortenedUnit = unit;
    }
    return `${value}${shortenedUnit}`;
  };

  return (
    <li role="row">
      <Link
        className={`chatlist__item columns is-marginless ${
          chat.chatRoomId === chatRoomId ? 'chatlist__item--selected' : ''
        }`}
        to={`${basePath}/${chat.chatRoomId}`}
      >
        <Avatar
          className="chatlist__item__avatar column is-narrow"
          userName={chat.chatRoomId}
          diameter="3rem"
        />
        <div className="column chatlist__item__details">
          <div className="detail__header">
            <div className="detail__header--name">{chat.chatRoomId}</div>
            <div className="detail__header--timeago">
              <TimeAgo date={chat.updatedAt} formatter={formatter} />
            </div>
          </div>
          <div className="detail__content">
            <div>Selling Amt: {chat.sellerPrice}</div>
            <div>Lowest Price: {chat.sellerNumberOfShares}</div>
          </div>
          <div>Archived Status: {chat.isArchived ? 'True' : 'False'}</div>
          <ChatArchiveButton isArchived={chat.isArchived} />
        </div>
      </Link>
    </li>
  );
};

export default ChatRoom;
