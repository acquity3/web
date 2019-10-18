import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './OngoingBidsGhost.scss';

const OngoingBidsGhost = () => {
  return (
    <div className="ongoingBids">
      <div className="bid">
        <div className="bid__header">
          <span className="bid__header__info bid__header__info--ghost">
            <Skeleton />
          </span>
          <span className="bid__header__timestamp bid__header__timestamp--ghost">
            <Skeleton />
          </span>
        </div>
        <div className="columns is-mobile">
          <div className="bid__content column">
            <div className="columns">
              <div className="bid__details column">
                <span className="bid__details__label">Quantity:</span>
                <span className="bid__details__value">
                  <Skeleton />
                </span>
              </div>
              <div className="bid__details column">
                <span className="bid__details__label">Price:</span>
                <span className="bid__details__value">
                  <Skeleton />
                </span>
              </div>
              <div className="bid__details column">
                <span className="bid__details__label">Estimated total:</span>
                <span className="bid__details__value">
                  <Skeleton />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-narrow bid__editButton">
            <Skeleton circle height="2rem" width="2rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingBidsGhost;
