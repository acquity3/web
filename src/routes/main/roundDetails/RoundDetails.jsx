import React from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown-now';

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
  // TODO: Hook to API to retrieve next round.
  // Can be timestamp that has passed, then will automatically go to closed
  const timeToEndOfRound = Date.now() + 10000;

  return (
    <div className="roundDetails">
      <div className="roundDetails__content">
        <Countdown date={timeToEndOfRound} renderer={countdownRenderer} />
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
