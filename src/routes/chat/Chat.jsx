import React, { useState } from 'react';
import PageContainer from 'components/pageContainer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';

import ChatRooms from './ChatRooms';
import ChatMessages from './ChatConversation/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import ChatHeader from './ChatHeader';
import './Chat.scss';

const ChatNav = ({ isViewingUnArchived, setViewingUnArchived }) => {
  const userType = useSelector(state => state.misc.userType);
  const socket = useSocket();

  const handleArchive = () => {
    SocketRequestService.getChatRooms({
      socket,
      userType,
      isArchived: isViewingUnArchived
    });
    setViewingUnArchived(!isViewingUnArchived);
  };
  return (
    <div className="chat__header columns">
      <div className="column chat__header__left is-two-fifths">
        <span>Matches</span>
        <button type="button" className="view-archive" onClick={handleArchive}>
          {isViewingUnArchived ? 'View Archived' : 'View Unarchived'}
        </button>
      </div>
    </div>
  );
};

const ChatContent = () => {
  return (
    <div className="column chat__content">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

const Chat = () => {
  const { chatRoomId } = useParams();
  const [isViewingUnArchived, setViewingUnArchived] = useState(true);

  return (
    <PageContainer className="chat">
      {/* TODO: clean up redux model to not use arrays and make keys more meaningful */}
      <ChatNav
        isViewingUnArchived={isViewingUnArchived}
        setViewingUnArchived={setViewingUnArchived}
      />
      <div className="columns is-gapless">
        <ChatRooms isViewingUnArchived={isViewingUnArchived} />
        {chatRoomId && <ChatContent />}
      </div>
    </PageContainer>
  );
};

export default Chat;
