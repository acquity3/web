import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqAcceptOffer, reqDeclineOffer } from 'reducers/ChatDux';

import './ChatMessage.scss';

const Offer = ({ chat, timeString, chatUserType }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const chatRoomIdValue = useSelector(state => state.chat.chatRoom.chatRoomId);
  const userTypeValue = useSelector(state => state.misc.userType);

  const fetchAcceptOffer = useCallback(
    ({ userType, offerId, chatRoomId }) => {
      dispatch(
        reqAcceptOffer({
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

  const declineOfferCallback = useCallback(
    ({ userType, offerId, chatRoomId }) => {
      dispatch(
        reqDeclineOffer({
          userType,
          offerId,
          chatRoomId
        })
      );
    },
    [dispatch]
  );

  const declineOffer = () => {
    declineOfferCallback({
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
        {chatUserType !== userTypeValue ? (
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
              onClick={declineOffer}
            >
              Reject
            </button>
          </div>
        ) : (
          <div>{chat.offerStatus}</div>
        )}
      </div>
    </div>
  );
};

export default Offer;
