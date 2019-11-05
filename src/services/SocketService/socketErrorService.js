import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  resChatRooms,
  resChatConversation,
  resNewChat,
  resAcceptOffer
} from 'reducers/ChatDux';
import Socket from './socketSetup';

export const getChatList = () => {
  Socket.socket.on('err_chat_rooms', payload => {
    store.dispatch(
      resChatRooms({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const getChatRoom = () => {
  Socket.socket.on('err_conversation', payload => {
    store.dispatch(
      resChatConversation({
        chatRoom: camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getNewMessage = () => {
  Socket.socket.on('err_new_message', payload => {
    console.log(payload);
    store.dispatch(
      resNewChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getNewOffer = () => {
  Socket.socket.on('err_new_offer', payload => {
    store.dispatch(
      resNewChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const getAcceptOffer = () => {
  Socket.socket.on('err_accept_offer', payload => {
    store.dispatch(
      resAcceptOffer({
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
