import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Avatar from 'components/avatar';
import ArchiveLogo from 'components/svgr/ArchiveLogo';
import UnArchiveLogo from 'components/svgr/UnArchiveLogo';
import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';

import './ChatRoom.scss';

const ArchiveNav = ({ isViewingUnArchived, chatRoomId }) => {
  const socket = useSocket();
  const archiveChatRoom = () => {
    SocketRequestService.archiveChatRoom({
      socket,
      chatRoomId
    });
  };
  const unarchiveChatRoom = () => {
    SocketRequestService.unarchiveChatRoom({
      socket,
      chatRoomId
    });
  };

  return (
    <div className="detail__footer dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu4"
        >
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu4" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            {isViewingUnArchived ? (
              <button type="button" onClick={archiveChatRoom}>
                <ArchiveLogo /> archive
              </button>
            ) : (
              <button type="button" onClick={unarchiveChatRoom}>
                <UnArchiveLogo /> unarchive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatRoom = ({ chat, basePath, isViewingUnArchived }) => {
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
        className={`chatroom__item columns is-marginless ${
          chat.chatRoomId === chatRoomId ? 'chatroom__item--selected' : ''
        }`}
        to={`${basePath}/${chat.chatRoomId}`}
      >
        <Avatar
          className="chatroom__item__avatar column is-narrow"
          userName={chat.friendlyName}
          diameter="3rem"
        />
        <div className="column chatroom__item__details">
          <div className="detail__header">
            <div className="detail__header--name">{chat.friendlyName}</div>
            <div className="detail__header--timeago">
              <TimeAgo date={chat.updatedAt} formatter={formatter} />
            </div>
          </div>
          {/* TODO: Remove hardcode */}
          <div className="detail__content">
            <div>Selling Amt: 2000</div>
            <div>Lowest Price: $6.10</div>
          </div>
          <ArchiveNav
            isViewingUnArchived={isViewingUnArchived}
            chatRoomId={chat.chatRoomId}
          />
        </div>
      </Link>
    </li>
  );
};

export default ChatRoom;
