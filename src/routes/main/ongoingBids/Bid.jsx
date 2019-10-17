import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import { moneyFormatter } from 'utils';
import './Bid.scss';

const mockBid = {
  id: '123tei2E2',
  bidNum: '2',
  stockName: 'Grab Holdings Pte Ltd',
  quantity: '3000',
  price: '6.89',
  timestamp: '1570866188'
};

const Bid = ({ _bid }) => {
  const bidTime = new Date(mockBid.timestamp * 1000);
  return (
    <div className="bid">
      <div className="bid__header">
        <span className="bid__header__info">
          <span className="bid__header__info__bidNumber">
            Bid #{mockBid.bidNum}:&nbsp;
          </span>
          <span className="bid__header__info__name">{mockBid.stockName}</span>
        </span>
        <span className="bid__header__timestamp">
          <TimeAgo title={bidTime.toLocaleString()} date={bidTime} />
        </span>
      </div>
      <div className="columns is-mobile">
        <div className="bid__content column">
          <div className="columns">
            <div className="bid__details column">
              <span className="bid__details__label">Quantity:</span>
              <span className="bid__details__value">
                {parseFloat(mockBid.quantity).toLocaleString()}
              </span>
            </div>
            <div className="bid__details column">
              <span className="bid__details__label">Price:</span>
              <span
                className="bid__details__value"
                title={`$S ${mockBid.price.toLocaleString()}`}
              >
                S$ {moneyFormatter(mockBid.price)}
              </span>
            </div>
            <div className="bid__details column">
              <span className="bid__details__label">Estimated total:</span>
              <span
                className="bid__details__value"
                title={`$S ${(
                  mockBid.price * mockBid.quantity
                ).toLocaleString()}`}
              >
                S$ {moneyFormatter(mockBid.price * mockBid.quantity)}
              </span>
            </div>
          </div>
        </div>
        <div className="column is-narrow bid__editButton">
          <Link to={{ pathname: `/bids/edit/${mockBid.id}`, bid: mockBid }}>
            <button
              className="button button--cta button--nav--circle hvr-grow"
              type="button"
            >
              <i className="fas fa-arrow-right" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bid;
