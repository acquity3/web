import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';
import OngoingBidsGhost from './ongoingBids/OngoingBidsGhost';
import OngoingBids from './ongoingBids';
import RoundDetails from './roundDetails';
import './Main.scss';

const Main = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    ongoingBids: []
  });

  useEffect(() => {
    ApiService.get('buy_order').then(res => {
      setState({ ongoingBids: res.data, isLoading: false });
    });
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
