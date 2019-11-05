import snakecaseKeys from 'snakecase-keys';
import tokenUtils from 'utils/tokenUtils';
import Socket from './socketSetup';

const requestChatRooms = ({ userType }) => {
  Socket.socket.emit(
    'req_chat_rooms',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      userType
    })
  );
};

const requestChatConversation = ({ chatRoomId, userType }) => {
  Socket.socket.emit(
    'req_conversation',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      chatRoomId,
      userType
    })
  );
};

const requestNewMessage = ({ chatRoomId, message, userType }) => {
  Socket.socket.emit(
    'req_new_message',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      message,
      chatRoomId,
      userType
    })
  );
};

const requestNewOffer = ({
  price,
  numberOfShares,
  userType,
  chatRoomId,
  authorHiddenId
}) => {
  Socket.socket.emit(
    'req_new_offer',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      price,
      numberOfShares,
      userType,
      chatRoomId,
      authorHiddenId
    })
  );
};

const requestAcceptOffer = ({ offerId, userType, chatRoomId }) => {
  Socket.socket.emit(
    'req_accept_offer',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      offerId,
      userType,
      chatRoomId
    })
  );
};

export default {
  requestChatRooms,
  requestChatConversation,
  requestNewMessage,
  requestNewOffer,
  requestAcceptOffer
};
