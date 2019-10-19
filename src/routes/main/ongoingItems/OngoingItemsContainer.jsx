import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import ApiService from 'services/apiService';
import ItemsGhost from './ItemsGhost';
import Items from './Items';

import './OngoingItemsContainer.scss';

const OngoingItemsContainer = ({ type }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    ongoingItems: []
  });

  useEffect(() => {
    const apiUrl = type === 'bids' ? 'buy_order' : 'sell_order';
    ApiService.get(apiUrl).then(res => {
      setState({ ongoingItems: res.data, isLoading: false });
    });
  }, [type]);

  return (
    <div className="info">
      <div className="info__header">Ongoing {type}</div>
      <div className="info__content">
        {state.isLoading ? (
          <ItemsGhost />
        ) : (
          <>
            <Items type={type} ongoingItems={state.ongoingItems} />
            <Link to={`${type}/new`}>
              <button
                type="button"
                className="button button--cta hvr-grow info__button"
              >
                Create New {type}
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default OngoingItemsContainer;
