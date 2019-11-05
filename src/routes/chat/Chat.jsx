import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageContainer from 'components/pageContainer';
import { reqChatConversation, reqChatRooms } from 'reducers/ChatDux';
import { useSocket } from 'contexts/socketContext';

import ChatRooms from './ChatRooms';
import ChatMessages from './ChatConversation/ChatMessages';
import ChatSendMessage from './ChatSendMessage/ChatSendMessage';
import ChatHeader from './ChatHeader/ChatHeader';
import './Chat.scss';

const ChatNav = ({ correspondentName }) => {
  return (
    <>
      <div className="chat__header columns">
        <div className="column chat__header__left is-two-fifths">
          <span>Matches</span>
          <span className="view-archive">View archive</span>
        </div>
        <div className="column chat__header--user">{correspondentName}</div>
      </div>
    </>
  );
};

const ChatContent = () => {
  return (
    <div className="column chat__content">
      <ChatHeader />
      <ChatMessages />
      <ChatSendMessage />
    </div>
  );
};

const Chat = () => {
  const dispatch = useDispatch();
  const { chatRoomId } = useParams();
  const correspondentName = useSelector(
    state => state.chat.chatRoom.length > 0 && state.chat.chatRoom[0].dealerName
  );
  const userType = useSelector(state => state.misc.userType);

  const { socketInit, socketEnd } = useSocket();
  useEffect(() => {
    socketInit();
    dispatch(reqChatRooms({ userType }));
    if (chatRoomId) {
      dispatch(reqChatConversation({ chatRoomId, userType }));
    }
    return () => {
      socketEnd();
    };
  });
  return (
    <PageContainer className="chat">
      {/* TODO: clean up redux model to not use arrays and make keys more meaningful */}
      <ChatNav correspondentName={correspondentName} />
      <div className="columns is-gapless">
        <ChatRooms />
        {chatRoomId && <ChatContent />}
      </div>
    </PageContainer>
  );
};

export default Chat;
