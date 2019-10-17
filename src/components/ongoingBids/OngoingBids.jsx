import React from 'react';
import Bid from './Bid';

import './OngoingBids.scss';

const OngoingBids = ({ ongoingBids }) => {
  if (ongoingBids.length === 0) {
    return (
      <div className="ongoingBids">
        <div className="ongoingBids__emptyText">You have no ongoing bids!</div>
      </div>
    );
  }

  return ongoingBids.map(bid => <Bid bid={bid} />);
};

export default OngoingBids;
