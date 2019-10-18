import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown-now';

import ApiService from 'services/apiService';
import './RoundDetails.scss';

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <NotifyDetails />;
  }

  return (
    <div className="countdownDetails">
      <div className="countdownDetails__header">Round Closing In:</div>
      <div className="countdownDetails__timer">
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(days)}
          </span>
          <span className="countdownDetails__timer__counter__text">days</span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(hours)}
          </span>
          <span className="countdownDetails__timer__counter__text">hours</span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(minutes)}
          </span>
          <span className="countdownDetails__timer__counter__text">
            minutes
          </span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(seconds)}
          </span>
          <span className="countdownDetails__timer__counter__text">
            seconds
          </span>
        </span>
      </div>
    </div>
  );
};

const RoundDetails = () => {
  const [timeForRoundEnd, setTimeForRoundEnd] = useState(new Date(null));

  // TODO: add catch statement to show error,
  // TODO: add animation for loading
  useEffect(() => {
    ApiService.get('round/active').then(res => {
      // Multiply by 1000 since converting timestamp to milliseconds
      setTimeForRoundEnd(new Date(res.data * 1000));
    });
  }, []);

  return (
    <div className="roundDetails">
      <div className="roundDetails__content">
        <Countdown date={timeForRoundEnd} renderer={countdownRenderer} />
      </div>
      <Link to="/previous-round/summary">
        View summary of the previous round &gt;
      </Link>
    </div>
  );
};

const NotifyDetails = () => {
  return (
    <div className="countdownDetails">
      <div className="countdownDetails__header">
        The next round has not opened yet.
      </div>
      <div className="countdownDetails__text">
        You may still place your bids. We will notify you when the next round
        begins
      </div>
    </div>
  );
};

export default RoundDetails;
