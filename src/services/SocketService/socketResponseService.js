import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  resChatRooms,
  resChatConversation,
  resNewChat,
  resAcceptOffer,
  resDeclineOffer,
  resArchive,
  testRes
} from 'reducers/ChatDux';
import Socket from './socketSetup';

export const getChatRooms = () => {
  Socket.socket.on('res_chat_rooms', payload => {
    store.dispatch(
      resChatRooms({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const getChatConversation = () => {
  Socket.socket.on('res_conversation', payload => {
    store.dispatch(
      resChatConversation({
        chatRoom: camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getNewMessage = () => {
  Socket.socket.on('res_new_message', payload => {
    store.dispatch(
      resNewChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getNewOffer = () => {
  Socket.socket.on('res_new_offer', payload => {
    store.dispatch(
      resNewChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getAcceptOffer = () => {
  Socket.socket.on('res_accept_offer', payload => {
    store.dispatch(
      resAcceptOffer({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getDeclineOffer = () => {
  Socket.socket.on('res_decline_offer', payload => {
    store.dispatch(
      resDeclineOffer({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getArchive = () => {
  Socket.socket.on('res_archive', payload => {
    store.dispatch(
      resArchive({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getRejectMatch = () => {
  Socket.socket.on('res_reject_match', payload => {
    store.dispatch(
      testRes({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getOtherPartyDetails = () => {
  Socket.socket.on('res_other_party_details', payload => {
    store.dispatch(
      testRes({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

const initialize = () => {
  Socket.getChatRooms = getChatRooms();
  Socket.getChatConversation = getChatConversation();
  Socket.getNewMessage = getNewMessage();
  Socket.getNewOffer = getNewOffer();
  Socket.getAcceptOffer = getAcceptOffer();
  Socket.getDeclineOffer = getDeclineOffer();
  Socket.getArchive = getArchive();
  Socket.getRejectMatch = getRejectMatch();
  Socket.getOtherPartyDetails = getOtherPartyDetails();
};

export default {
  initialize
};
