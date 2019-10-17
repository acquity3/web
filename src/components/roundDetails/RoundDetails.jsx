import React from 'react';
import { Link } from 'react-router-dom';

import './RoundDetails.scss';

const RoundDetails = () => {
  // TODO: Hook to API to retrieve next round.
  // Should be null if no next round yet.
  const roundDetails = null;

  return (
    <div className="roundDetails">
      <div className="roundDetails__content">
        {roundDetails ? <CountdownDetails /> : <NotifyDetails />}
      </div>
      <Link to="/previous-round/summary">
        View summary of the previous round
      </Link>
    </div>
  );
};

const CountdownDetails = () => {
  return <div>Round closing in</div>;
};

const NotifyDetails = () => {
  return (
    <div className="notifyDetails">
      <div className="notifyDetails__header">
        The next round has not opened yet.
      </div>
      <div className="notifyDetails__text">
        You may still place your bids. We will notify you when the next round
        begins
      </div>
    </div>
  );
};

export default RoundDetails;
