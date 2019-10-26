import React from 'react';
import { useSelector } from 'react-redux';
import PageContainer from 'components/pageContainer';

import ChatList from './ChatList/ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatInput from './ChatInput/ChatInput';
import ChatOffer from './ChatOffer/ChatOffer';
import './Chat.scss';

const ChatHeader = ({ correspondentName }) => {
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

const Chat = () => {
  const chatRoomId = useSelector(state => state.chat.chatRoomId);
  const correspondentName = useSelector(
    state => state.chat.chatRoom.length > 0 && state.chat.chatRoom[0].dealerName
  );

  return (
    <PageContainer className="chat">
      {/* TODO: clean up redux model to not use arrays and make keys more meaningful */}
      <ChatHeader correspondentName={correspondentName} />
      <div className="columns is-gapless">
        <div className="column is-hidden-mobile is-two-fifths">
          <div>
            <ChatList />
          </div>
        </div>
        <div className="column">
          {chatRoomId === '' ? (
            <div className="chat__chatroom">No messages here yet...</div>
          ) : (
            <div>
              <ChatOffer />
              <ChatRoom />
              <ChatInput />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Chat;
