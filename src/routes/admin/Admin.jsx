import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import ApiService from 'services/apiService';
import ErrorMessage from 'components/errorMessage';
import { updateSecurities } from 'reducers/SecuritiesDux';

import IncomingBuyers from './IncomingBuyers';
import './Admin.scss';
import IncomingSellers from './IncomingSellers';
import AdjustMarketPrice from './adjustMarketPrice/AdjustMarketPrice';

const Admin = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isError: false,
    requests: {}
  });

  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const requestsResponse = await ApiService.get('requests');
        const securitiesResponse = await ApiService.get('security');
        if (!didCancel) {
          setState({ requests: requestsResponse.data });
          dispatch(updateSecurities(securitiesResponse.data));
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isError: true });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  return (
    <PageContainer dark>
      <div className="main page">
        <div className="page__content">
          {state.isError && <ErrorMessage />}
          <IncomingBuyers incomingBuyers={state.requests.buyers || []} />
          <IncomingSellers incomingSellers={state.requests.sellers || []} />
          <AdjustMarketPrice />
        </div>
      </div>
    </PageContainer>
  );
};

export default Admin;
