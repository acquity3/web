import React, { useEffect, useReducer } from 'react';

import PageContainer from 'components/pageContainer';
import ApiService from 'services/apiService';
import ErrorMessage from 'components/errorMessage';

import IncomingBuyers from './IncomingBuyers';
import './Admin.scss';
import IncomingSellers from './IncomingSellers';

const Admin = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isError: false,
    requests: {}
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('/requests');
        if (!didCancel) {
          setState({ requests: response.data });
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
  }, []);

  return (
    <PageContainer dark>
      <div className="main page">
        <div className="page__content">
          {state.isError && <ErrorMessage />}
          <IncomingBuyers incomingBuyers={state.requests.buyers || []} />
          <IncomingSellers incomingSellers={state.requests.sellers || []} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Admin;
