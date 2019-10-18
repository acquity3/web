import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import { moneyFormatter } from 'utils/moneyUtils';
import './Bid.scss';

const Bid = ({ bid }) => {
  const bidTime = new Date(bid.timestamp * 1000);
  return (
    <div className="bid">
      <div className="bid__header">
        <span className="bid__header__info">
          <span className="bid__header__info__name">{bid.securityName}</span>
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
                {parseFloat(bid.numberOfShares).toLocaleString()}
              </span>
            </div>
            <div className="bid__details column">
              <span className="bid__details__label">Price:</span>
              <span
                className="bid__details__value"
                title={`$S ${bid.price.toLocaleString()}`}
              >
                S$ {moneyFormatter(bid.price)}
              </span>
            </div>
            <div className="bid__details column">
              <span className="bid__details__label">Estimated total:</span>
              <span
                className="bid__details__value"
                title={`$S ${(
                  bid.price * bid.numberOfShares
                ).toLocaleString()}`}
              >
                S$ {moneyFormatter(bid.price * bid.numberOfShares)}
              </span>
            </div>
          </div>
        </div>
        <div className="column is-narrow bid__editButton">
          <Link to={{ pathname: `/bids/edit/${bid.id}`, bid }}>
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
