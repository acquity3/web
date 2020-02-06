import React, { useEffect, useReducer } from 'react';
import ApiService from 'services/apiService';
import './SiteInfo.scss';

const SiteInfo = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const [stats] = await Promise.all([ApiService.get('user/stats')]);
        if (!didCancel) {
          setState({
            buyerCount: stats.data.buyers,
            sellerCount: stats.data.sellers,
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
    <div className="siteInfo">
      {!state.isLoading && !state.isError && (
        <div>
          <b>{state.buyerCount}</b> buyers and <b>{state.sellerCount}</b>{' '}
          sellers participating
        </div>
      )}
    </div>
  );
};

export default SiteInfo;
