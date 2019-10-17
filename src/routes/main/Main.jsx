import React from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import OngoingBids from 'components/ongoingBids/OngoingBids';
import RoundDetails from 'components/roundDetails/RoundDetails';
import './Main.scss';

const Main = () => {
  // TODO: Call backend to check if user has bids
  const ongoingBids = [1, 1];
  return (
    <div className="columns is-marginless is-mobile is-centered">
      <div className="is-container column is-two-thirds-tablet is-four-fifths-mobile">
        <div className="content-container">
          <SimpleBar className="page-content-container">
            <div className="main">
              <div className="main__header">Ongoing Bid</div>
              <div className="main__content">
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
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default Main;
