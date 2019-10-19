import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import OngoingBidsGhost from './ongoingBids/OngoingBidsGhost';
import OngoingBids from './ongoingBids';
import RoundDetails from './roundDetails';
import './Main.scss';

const mockBid1 = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  numberOfShares: 3333,
  price: 7.02,
  securityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  securityName: 'Grab',
  roundId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  timestamp: 1568832197
};

const mockBid2 = {
  id: '3fa85f64-5717-4562-b3fc-2c9657jja66afa6',
  userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  numberOfShares: 699,
  price: 5.66,
  securityId: '3fa823234-5717-4562-b3fc-2c963f66afa6',
  securityName: 'Carousell',
  roundId: '3fa23364-5717-4562-b3fc-2c963f66afa6',
  timestamp: 1570819397
};

const Main = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    ongoingBids: []
  });

  useEffect(() => {
    // TODO: Call backend to check if user has bids
    // Fake API call for now
    setTimeout(() => {
      setState({ ongoingBids: [mockBid1, mockBid2], isLoading: false });
    }, 250);
  }, []);
  return (
    <PageContainer>
      <div className="main page">
        <div className="page__header">Ongoing Bids</div>
        <div className="page__content">
          {state.isLoading ? (
            <OngoingBidsGhost />
          ) : (
            <>
              <OngoingBids ongoingBids={state.ongoingBids} />
              <Link to="bids/new">
                <button type="button" className="button button--cta hvr-grow">
                  Create New Bid
                </button>
              </Link>
            </>
          )}
          <div className="is-divider main__content__divider" />
          <RoundDetails />
        </div>
      </div>
    </PageContainer>
  );
};

export default Main;
