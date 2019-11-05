import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchNewOfferAction } from 'reducers/ChatDux';

import './ChatHeader.scss';

const ChatCreateOffer = ({ setHeader }) => {
  const dispatch = useDispatch();
  const chatRoomIdValue = useSelector(state => state.chat.chatRoom.chatRoomId);
  const userTypeValue = useSelector(state => state.misc.userType);
  const [priceValue, setPrice] = useState('');
  const [numberOfSharesValue, setNumberOfShares] = useState('');
  const { sellerHiddenId, buyerHiddenId } = useSelector(
    state => state.chat.chatRoom
  );

  const fetchMakeOffer = useCallback(
    ({ price, numberOfShares, chatRoomId, userType }) => {
      dispatch(
        fetchNewOfferAction({
          price,
          numberOfShares,
          chatRoomId,
          userType,
          authorHiddenId: userType === 'seller' ? sellerHiddenId : buyerHiddenId
        })
      );
    },
    [dispatch, buyerHiddenId, sellerHiddenId]
  );

  const createNewOffer = () => {
    if (!priceValue || !numberOfSharesValue) return;
    fetchMakeOffer({
      price: priceValue,
      numberOfShares: numberOfSharesValue,
      chatRoomId: chatRoomIdValue,
      userType: userTypeValue
    });
    setPrice('');
    setNumberOfShares('');
    setHeader(0);
  };

  const cancelCurrentOffer = () => {
    setPrice('');
    setNumberOfShares('');
    setHeader(0);
  };

  return (
    <div className="columns is-gapless is-mobile">
      <div className="field">
        <div className="control">
          <input
            className="input is-info"
            type="number"
            placeholder="Price"
            value={priceValue}
            onChange={event => setPrice(event.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input is-info"
            type="number"
            placeholder="Number Of Shares"
            value={numberOfSharesValue}
            onChange={event => setNumberOfShares(event.target.value)}
          />
        </div>
      </div>
      <button
        type="button"
        className="column button is-success is-outlined"
        onClick={createNewOffer}
      >
        Make Offer
      </button>
      <button
        type="button"
        className="column button is-danger is-outlined"
        onClick={cancelCurrentOffer}
      >
        Cancel
      </button>
    </div>
  );
};

export default ChatCreateOffer;
