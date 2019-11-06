import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import { errChat } from 'reducers/ChatDux';
import Socket from './socketSetup';

export const errChatRooms = () => {
  Socket.socket.on('err_chat_rooms', payload => {
    store.dispatch(
      errChat({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const errChatConversation = () => {
  Socket.socket.on('err_conversation', payload => {
    store.dispatch(
      errChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const errNewMessage = () => {
  Socket.socket.on('err_new_message', payload => {
    store.dispatch(
      errChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const errNewOffer = () => {
  Socket.socket.on('err_new_offer', payload => {
    store.dispatch(
      errChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const errAcceptOffer = () => {
  Socket.socket.on('err_accept_offer', payload => {
    store.dispatch(
      errChat({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

const initialize = () => {
  Socket.errChatRooms = errChatRooms();
  Socket.errChatConversation = errChatConversation();
  Socket.errNewMessage = errNewMessage();
  Socket.errNewOffer = errNewOffer();
  Socket.errAcceptOffer = errAcceptOffer();
};

export default {
  initialize
};
