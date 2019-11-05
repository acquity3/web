import React from 'react';
import './ChatHeader.scss';

const ChatOfferDetailsHeader = ({ headerText, quantity, price }) => {
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

export default ChatOfferDetailsHeader;
