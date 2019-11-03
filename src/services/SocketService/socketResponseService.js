import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  updateChatListAction,
  updateChatRoomAction,
  updateNewChatAction,
  updateAcceptOfferAction
} from 'reducers/ChatDux';
import Socket from './socketSetup';

export const getChatList = () => {
  Socket.socket.on('res_chat_rooms', payload => {
    store.dispatch(
      updateChatListAction({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const getChatRoom = () => {
  Socket.socket.on('res_conversation', payload => {
    store.dispatch(
      updateChatRoomAction({
        chatRoom: camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getNewMessage = () => {
  Socket.socket.on('res_new_message', payload => {
    store.dispatch(
      updateNewChatAction({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getNewOffer = () => {
  Socket.socket.on('res_new_offer', payload => {
    store.dispatch(
      updateNewChatAction({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getAcceptOffer = () => {
  Socket.socket.on('res_accept_offer', payload => {
    store.dispatch(
      updateAcceptOfferAction({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

const initialize = () => {
  Socket.getChatList = getChatList();
  Socket.getChatRoom = getChatRoom();
  Socket.getNewMessage = getNewMessage();
  Socket.getNewOffer = getNewOffer();
  Socket.getAcceptOffer = getAcceptOffer();
};

export default {
  initialize
};
