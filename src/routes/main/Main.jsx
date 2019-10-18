import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import OngoingBids from './ongoingBids';
import RoundDetails from './roundDetails';
import './Main.scss';
import OngoingBidsGhost from './ongoingBids/OngoingBidsGhost';

const mockBid1 = {
  id: '123tei2E2',
  bidNum: '1',
  stockName: 'Grab Holdings Pte Ltd',
  quantity: '3000',
  price: '6.89',
  timestamp: '1570866188'
};

const mockBid2 = {
  id: '125kjm3ee',
  bidNum: '2',
  stockName: 'Grab Holdings Pte Ltd',
  quantity: '600',
  price: '7',
  timestamp: '1570867188'
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
    }, 2000);
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
