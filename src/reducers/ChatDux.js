import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';
import SocketRequestService from 'services/SocketService/socketRequestService';

const chat = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    chatRoom: {
      chatRoomId: '',
      sellerPrice: null,
      sellerNumberOfShares: null,
      buyerPrice: null,
      buyerNumberOfShares: null,
      updatedAt: null,
      conversation: []
    },
    message: '',
    chatRoomId: ''
  },
  reducers: {
    resChatRooms: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatList = _orderBy(payload, ['updatedAt'], ['desc']);
    },
    reqChatRooms: (state, { payload }) => {
      SocketRequestService.requestChatRooms(payload);
    },
    reqChatConversation: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoomId = payload.chatRoomId;
      SocketRequestService.requestChatConversation(payload);
    },
    resChatConversation: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoom = payload.chatRoom;
    },
    reqNewMessage: (state, { payload }) => {
      SocketRequestService.requestNewMessage(payload);
    },
    resNewChat: (state, { payload }) => {
      const { newChat } = payload;
      state.chatRoom.conversation.push({ ...newChat });
      const index = _findIndex(
        state.chatList,
        c => c.chatRoomId === payload.chatRoomId
      );
      // eslint-disable-next-line no-param-reassign
      state.chatList[index].updatedAt = payload.updatedAt;
      // eslint-disable-next-line no-param-reassign
      state.chatList = _orderBy(state.chatList, ['updatedAt'], ['desc']);
    },
    reqNewOffer: (state, { payload }) => {
      SocketRequestService.requestNewOffer(payload);
    },
    resAcceptOffer: (state, { payload }) => {
      const chatListIndex = _findIndex(
        state.chatList,
        c => c.chatRoomId === payload.chatRoomId
      );
      // eslint-disable-next-line no-param-reassign
      state.chatList[chatListIndex].isDealClosed = payload.isDealClosed;
      const chatMessageIndex = _findIndex(
        state.chatRoom.conversation,
        c => c.id === payload.newChat.id
      );
      // eslint-disable-next-line no-param-reassign
      state.chatRoom.isDealClosed = payload.isDealClosed;
      // eslint-disable-next-line no-param-reassign
      state.chatRoom.conversation[chatMessageIndex].offerStatus =
        payload.newChat.offerStatus;
    },
    reqAcceptOffer: (state, { payload }) => {
      SocketRequestService.requestAcceptOffer(payload);
    }
  }
});
export const {
  reqChatRooms,
  resChatRooms,
  reqChatConversation,
  resChatConversation,
  reqNewMessage,
  resNewChat,
  reqNewOffer,
  resAcceptOffer,
  reqAcceptOffer
} = chat.actions;

export default chat.reducer;
