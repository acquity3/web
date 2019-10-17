import React from 'react';
import Bid from './Bid';

import './OngoingBids.scss';

const OngoingBids = ({ ongoingBids }) => {
  return (
    <div className="ongoingBids">
      {ongoingBids.length === 0 ? (
        <div className="ongoingBids__emptyText">You have no ongoing bids!</div>
      ) : (
        ongoingBids.map(bid => <Bid bid={bid} />)
      )}
    </div>
  );
};

export default OngoingBids;
