import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageContainer from 'components/pageContainer';

import { moneyFormatter } from 'utils/moneyUtils';
import './Confirmation.scss';

const Confirmation = ({ bid, handleBackClick, history, apiCall }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmClick = () => {
    setIsLoading(true);
    apiCall()
      .then(_response => {
        setIsLoading(false);
        history.replaceState('/');
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <PageContainer>
      <div className="bidPage page confirmation">
        <div className="page__header columns is-mobile">
          <div className="column is-1">
            <button
              onClick={handleBackClick}
              className="button button--cta button--nav--circle hvr-grow"
              type="button"
            >
              <i className="fas fa-arrow-left" />
            </button>
          </div>
          <span className="bidPage__header__text column">Bid Information</span>
          <div className="column is-1" />
        </div>
        <div className="page__content columns is-mobile">
          <div className="column is-full-mobile is-four-fifths-tablet is-half-desktop">
            <div className="confirmation__details">
              <div className="confirmation__details__label">Company</div>
              <div className="confirmation__details__value">
                {bid.selectedSecurityName}
              </div>
              <div className="confirmation__details__label">
                Number of shares
              </div>
              <div className="confirmation__details__value">
                {bid.numShares}
              </div>
              <div className="confirmation__details__label">
                Maximum price per share
              </div>
              <div className="confirmation__details__value">
                SGD {moneyFormatter(bid.price)}
              </div>
              <div className="confirmation__details__label">
                Estimated total
              </div>
              <div className="confirmation__estimate__amount confirmation__details__value">
                <span className="estimate__amount--currency">SGD</span>
                <span className="estimate__amount--amount">
                  {moneyFormatter(bid.price * bid.numShares)}
                </span>
              </div>
            </div>
            <div className="confirmation__disclaimer">
              {/* TODO: Update copywriting of disclaimer */}
              Placing this bid does not guarantee a match nor the final price.
              It is up the buyers&apos; and sellers&apos; mutual agreement after
              discussion.
            </div>
            <div className="confirmation__action">
              <button
                onClick={handleConfirmClick}
                type="button"
                className={`button--cta button hvr-grow ${
                  isLoading ? 'is-loading' : ''
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

Confirmation.propTypes = {
  bid: PropTypes.shape({
    numShares: PropTypes.string,
    price: PropTypes.string,
    selectedSecurityName: PropTypes.string,
    selectedSecurityId: PropTypes.string
  }).isRequired,
  handleBackClick: PropTypes.func.isRequired,
  apiCall: PropTypes.func.isRequired
};

export default withRouter(Confirmation);
