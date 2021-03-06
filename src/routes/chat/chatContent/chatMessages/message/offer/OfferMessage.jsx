import React from 'react';

import { getTimeFromTimestamp } from 'utils';
import {
  ACCEPT_OFFER_TYPE,
  REJECT_OFFER_TYPE,
  PENDING_OFFER_TYPE,
  CANCEL_OFFER_TYPE
} from 'constants/socket';
import { useSocket } from 'contexts/socketContext';
import { useUser } from 'contexts/userContext';
import SocketRequestService from 'services/SocketService/socketRequestService';
import { toCurrency } from 'utils/moneyUtils';

import './OfferMessage.scss';

const OfferMessage = ({ offer }) => {
  const user = useUser();
  const socket = useSocket();
  const isSentByUser = offer.authorId === user.id;
  const { offerStatus, id: offerId, chatRoomId } = offer;
  const timeString = getTimeFromTimestamp(offer.createdAt);

  const acceptOffer = () => {
    SocketRequestService.acceptOffer({
      offerId,
      socket,
      chatRoomId
    });
  };

  const declineOffer = () => {
    SocketRequestService.declineOffer({
      offerId,
      socket,
      chatRoomId
    });
  };

  const renderOfferStatus = () => {
    switch (offerStatus) {
      case ACCEPT_OFFER_TYPE:
        return <AcceptedOfferStatus />;
      case REJECT_OFFER_TYPE:
        return <RejectedOfferStatus />;
      case PENDING_OFFER_TYPE:
        return <PendingOfferStatus />;
      case CANCEL_OFFER_TYPE:
        return <CanceledOfferStatus />;
      default:
        throw new Error(`Invalid offer status ${offerStatus}`);
    }
  };

  const PendingOfferStatus = () => {
    if (isSentByUser) {
      return (
        <div className="offerMessage__status offerMessage__status--pending">
          Offer pending
        </div>
      );
    }
    return (
      <div className="offerMessage__status__pendingActions">
        <button
          type="button"
          className="button--success offerMessage__status__pendingActions--accept no-shadow hvr-grow"
          onClick={acceptOffer}
        >
          Accept
        </button>
        <button
          type="button"
          className="button--danger offerMessage__status__pendingActions--reject no-shadow hvr-grow"
          onClick={declineOffer}
        >
          Reject
        </button>
      </div>
    );
  };

  const AcceptedOfferStatus = () => {
    return (
      <div className="offerMessage__status offerMessage__status--accepted">
        {isSentByUser
          ? 'This offer has been accepted'
          : 'You accepted this offer'}
      </div>
    );
  };

  const RejectedOfferStatus = () => {
    return (
      <div className="offerMessage__status offerMessage__status--rejected">
        {isSentByUser
          ? 'This offer has been rejected'
          : 'You rejected this offer'}
      </div>
    );
  };

  const CanceledOfferStatus = () => {
    return (
      <div className="offerMessage__status offerMessage__status--canceled">
        {isSentByUser
          ? 'You canceled this offer'
          : 'This offer has been canceled'}
      </div>
    );
  };

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          isSentByUser ? 'right' : 'left'
        }`}
      >
        <div className={`offerMessage offerMessage--${offerStatus}`}>
          <div
            className={`offerMessage__header offerMessage__header--${
              isSentByUser ? 'right' : 'left'
            }`}
          >
            Made an offer:
          </div>
          <div className="offerMessage__bubble__message">
            <div className="offerMessage__bubble__message--title">Offer</div>
            <div className="offerMessage__bubble__message--quantity">
              Qty: {offer.numberOfShares}
            </div>
            <div className="offerMessage__bubble__message--price">
              Price: {toCurrency(offer.price)}
            </div>
            <div className="offerMessage__bubble__message--cost">
              Est. Total: {toCurrency(offer.price * offer.numberOfShares)}
            </div>
            <span className="offerMessage__bubble__message--timestamp">
              {timeString}
            </span>
          </div>
          {renderOfferStatus()}
        </div>
      </div>
    </div>
  );
};

export default OfferMessage;
