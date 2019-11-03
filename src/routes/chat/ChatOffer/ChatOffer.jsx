import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchNewOfferAction } from 'reducers/ChatDux';

import './ChatOffer.scss';

const ChatOfferDetails = ({ headerText, quantity, price }) => {
  return (
    <div className="chat__offer__details column counterpartDetails">
      <div className="chat__offer__details__header">{headerText}</div>
      <div className="chat__offer__details__details columns is-marginless">
        <div className="column is-paddingless details">
          <span className="details__label">Quantity:</span>
          <span className="details__value">{quantity}</span>
        </div>
        <div className="column is-paddingless details">
          <span className="details__label">Price:</span>
          <span className="details__value">SGD {price}</span>
        </div>
      </div>
    </div>
  );
};

const ChatOffer = () => {
  const [header, setHeader] = useState(0);
  const userType = useSelector(state => state.misc.userType);
  const chatRoom = useSelector(state => state.chat.chatRoom);

  const getSellerBuyerBids = () => {
    const seller = {
      price: chatRoom.sellerPrice,
      numberOfShares: chatRoom.sellerNumberOfShares
    };
    const buyer = {
      price: chatRoom.buyerPrice,
      numberOfShares: chatRoom.buyerNumberOfShares
    };
    return userType === 'seller'
      ? {
          me: seller,
          other: buyer
        }
      : {
          me: buyer,
          other: seller
        };
  };

  const { me, other } = getSellerBuyerBids();

  return (
    <div className="chat__offer column is-paddingless">
      <div className="columns is-mobile is-marginless">
        <ChatOfferDetails
          headerText={userType === 'seller' ? 'Buyer Offer' : 'Seller Offer'}
          quantity={other.numberOfShares}
          price={other.price}
        />
        <ChatOfferDetails
          headerText="Your Bid"
          quantity={me.numberOfShares}
          price={me.price}
        />
      </div>
      {header === 0 ? (
        <ChatDefaultHeader setHeader={setHeader} />
      ) : (
        <ChatCreateOffer setHeader={setHeader} />
      )}
    </div>
  );
};

const ChatDefaultHeader = ({ setHeader }) => {
  return (
    <div className="chat__offer__actions columns is-gapless is-mobile">
      <button
        type="button"
        className="column button is-success is-outlined"
        onClick={() => setHeader(1)}
      >
        Make Offer
      </button>
      <button type="button" className="column button is-danger is-outlined">
        Cancel Match
      </button>
    </div>
  );
};

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

export default ChatOffer;
