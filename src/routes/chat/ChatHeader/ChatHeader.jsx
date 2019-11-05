import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ChatCreateOffer from './ChatCreateOfferHeader';
import ChatDefaultHeader from './ChatDefaultHeader';
import ChatOfferDetailsHeader from './ChatOfferDetailsHeader';
import './ChatHeader.scss';

const ChatHeader = () => {
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
        <ChatOfferDetailsHeader
          headerText={userType === 'seller' ? 'Buyer Offer' : 'Seller Offer'}
          quantity={other.numberOfShares}
          price={other.price}
        />
        <ChatOfferDetailsHeader
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

export default ChatHeader;
