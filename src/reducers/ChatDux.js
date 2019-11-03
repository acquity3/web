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
    updateChatListAction: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatList = _orderBy(payload, ['updatedAt'], ['desc']);
    },
    fetchChatListAction: (state, { payload }) => {
      SocketRequestService.requestChatList(payload);
    },
    fetchChatRoomAction: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoomId = payload.chatRoomId;
      SocketRequestService.requestChatRoom({ chatRoomId: payload.chatRoomId });
    },
    updateChatRoomAction: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoom = payload.chatRoom;
    },
    fetchNewMessageAction: (state, { payload }) => {
      SocketRequestService.requestNewMessage(payload);
    },
    updateNewChatAction: (state, { payload }) => {
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
    fetchNewOfferAction: (state, { payload }) => {
      SocketRequestService.requestNewOffer(payload);
    },
    updateAcceptOfferAction: (state, { payload }) => {
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
    fetchAcceptOfferAction: (state, { payload }) => {
      SocketRequestService.requestAcceptOffer(payload);
    }
  }
});
export const {
  updateChatListAction,
  fetchChatListAction,
  fetchChatRoomAction,
  updateChatRoomAction,
  fetchNewMessageAction,
  fetchNewOfferAction,
  updateNewChatAction,
  updateAcceptOfferAction,
  fetchAcceptOfferAction
} = chat.actions;

export default chat.reducer;
