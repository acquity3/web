import React from 'react';
import { Link } from 'react-router-dom';

import PageContainer from 'components/pageContainer/PageContainer';
import OngoingBids from 'components/ongoingBids/OngoingBids';
import RoundDetails from 'components/roundDetails/RoundDetails';
import './Main.scss';

const Main = () => {
  // TODO: Call backend to check if user has bids
  const ongoingBids = [1, 1];
  return (
    <PageContainer>
      <div className="main page">
        <div className="page__header">Ongoing Bids</div>
        <div className="page__content">
          <OngoingBids ongoingBids={ongoingBids} />
          <Link to="bids/new">
            <button type="button" className="button hvr-grow">
              Create New Bid
            </button>
          </Link>
          <div className="is-divider main__content__divider" />
          <RoundDetails />
        </div>
      </div>
    </PageContainer>
  );
};

export default Main;
