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

const requestDeclineOffer = ({ offerId, userType, chatRoomId }) => {
  Socket.socket.emit(
    'req_decline_offer',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      offerId,
      userType,
      chatRoomId
    })
  );
};

const requestArchive = ({ isArchived, userType, chatRoomId }) => {
  Socket.socket.emit(
    'req_archive',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      isArchived,
      userType,
      chatRoomId
    })
  );
};

// TODO: Need to ask Herbet
const requestRejectMatch = ({ offerId, userType, chatRoomId }) => {
  Socket.socket.emit(
    'req_reject_match',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      offerId,
      userType,
      chatRoomId
    })
  );
};

// TODO: Need to ask Herbet
const requestOtherPartyDetails = ({ offerId, userType, chatRoomId }) => {
  Socket.socket.emit(
    'req_other_party_details',
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
  requestAcceptOffer,
  requestDeclineOffer,
  requestArchive,
  requestRejectMatch,
  requestOtherPartyDetails
};
