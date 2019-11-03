import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAcceptOfferAction } from 'reducers/ChatDux';

import './ChatMessage.scss';

const Conversation = ({ chat }) => {
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  const userType = useSelector(state => state.misc.userType);
  const { sellerHiddenId, buyerHiddenId } = useSelector(
    state => state.chat.chatRoom
  );
  const authorId = userType === 'seller' ? sellerHiddenId : buyerHiddenId;
  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          authorId === chat.authorHiddenId ? 'right' : 'left'
        }`}
      >
        {chat.type === 'message' ? (
          <Message chat={chat} timeString={timeString} authorId={authorId} />
        ) : (
          <Offer chat={chat} timeString={timeString} authorId={authorId} />
        )}
      </div>
    </div>
  );
};

const Message = ({ chat, timeString }) => {
  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        {chat.message}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

const Offer = ({ chat, timeString, authorId }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const chatRoomIdValue = useSelector(state => state.chat.chatRoom.chatRoomId);
  const userTypeValue = useSelector(state => state.misc.userType);

  const fetchAcceptOffer = useCallback(
    ({ userType, offerId, chatRoomId }) => {
      dispatch(
        fetchAcceptOfferAction({
          userType,
          offerId,
          chatRoomId
        })
      );
    },
    [dispatch]
  );

  const acceptOffer = () => {
    fetchAcceptOffer({
      userType: userTypeValue,
      offerId: chat.id,
      chatRoomId: chatRoomIdValue
    });
  };
  return (
    <div>
      <div className="chatMessage__bubble__message">
        <div role="button" onMouseDown={() => setShow(!show)} tabIndex={show}>
          <p className="chatMessage__bubble__message--message">
            Offer: #{chat.id}
          </p>
          <p className="chatMessage__bubble__message--message">
            Price: {chat.price}
          </p>
          <p className="chatMessage__bubble__message--message">
            Number Of Shares: {chat.numberOfShares}
          </p>
          <span className="chatMessage__bubble__message--timestamp">
            {timeString}
          </span>
        </div>
        {authorId !== chat.authorHiddenId ? (
          <div className="columns is-gapless is-mobile">
            <button
              type="button"
              className="column button is-success is-outlined"
              onClick={acceptOffer}
            >
              Accept
            </button>
            <button
              type="button"
              className="column button is-danger is-outlined"
            >
              Reject
            </button>
          </div>
        ) : (
          <div>Pending</div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
