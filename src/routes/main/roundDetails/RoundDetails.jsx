import React, { useEffect, useReducer } from 'react';
import Countdown, { zeroPad } from 'react-countdown-now';

import ErrorMessage from 'components/errorMessage';
import ApiService from 'services/apiService';
import NotifyDetails from './NotifyDetails';
import './RoundDetails.scss';
import RoundDetailsGhost from './RoundDetailsGhost';

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <NotifyDetails />;
  }

  return (
    <div className="countdownDetails">
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
          <span className="countdownDetails__timer__counter__text">mins</span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(seconds)}
          </span>
          <span className="countdownDetails__timer__counter__text">secs</span>
        </span>
      </div>
    </div>
  );
};

const RoundDetails = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    timeForRoundEnd: new Date(null),
    isError: false
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const [activeResponse, statsResponse] = await Promise.all([
          ApiService.get('round/active'),
          ApiService.get('round/active/stats')
        ]);

        if (!didCancel) {
          setState({
            timeForRoundEnd: activeResponse.data
              ? activeResponse.data.endTime * 1000
              : new Date(activeResponse.data),
            stats: statsResponse.data,
            isLoading: false
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isLoading: false,
            isError: true
          });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <div className="roundDetails">
      <div className="details__header">Round closing in</div>
      <div className="roundDetails__content">
        {state.isError && (
          <ErrorMessage message="Failed to fetch round data. Please refresh the page to try again." />
        )}
        {state.isLoading ? (
          <RoundDetailsGhost />
        ) : (
          <div>
            <Countdown
              date={state.timeForRoundEnd}
              renderer={countdownRenderer}
            />
            {state.stats && (
              <div>
                <div>
                  <div className="stats__header">Buy Orders:</div>
                  <div>total shares: {state.stats.buy.totalShares}</div>
                  {state.stats.buy.minPrice > 0 && (
                    <div>
                      price range {state.stats.buy.minPrice} -{' '}
                      {state.stats.buy.maxPrice}
                    </div>
                  )}
                </div>
                <div>
                  <div className="stats__header">Sell Orders:</div>
                  <div>total shares: {state.stats.sell.totalShares}</div>
                  {state.stats.sell.minPrice > 0 && (
                    <div>
                      price range {state.stats.sell.minPrice} -{' '}
                      {state.stats.sell.maxPrice}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoundDetails;
