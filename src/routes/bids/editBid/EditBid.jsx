/* eslint-disable no-console */
import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';

import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';
import EditBidForm from './EditBidForm';
import Confirmation from '../confirmation';

import './EditBid.scss';
import '../style.scss';

// Temporary mock bid until hooked to backend
const mockBid = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  numberOfShares: '3333',
  price: '7.02',
  securityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  securityName: 'Grab',
  roundId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
};

const EditBid = ({ match, location, history }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    error: false,
    showConfirm: false,
    formData: null
  });
  const bidId = match.params.id;
  const { bid } = location;

  // TODO: Retrieve bid with id from backend if undefined.
  // TODO: Throw error if unauthorized to edit given bid.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!bid) {
      setState({ formData: mockBid, isLoading: false });
    } else {
      setState({ formData: bid, isLoading: false });
    }
    return () => {};
  }, [bidId, bid]);

  if (state.showConfirm) {
    const apiCall = () =>
      ApiService.patch(`buy_order/${bidId}`, {
        newNumberOfShares: parseInt(state.formData.numberOfShares, 0),
        newPrice: parseFloat(state.formData.price)
      });
    return (
      <Confirmation
        bid={state.formData}
        apiCall={apiCall}
        handleBackClick={() => setState({ showConfirm: false })}
      />
    );
  }

  return (
    <PageContainer>
      <div className="bidPage page">
        <div className="page__header columns is-mobile">
          <div className="column is-1">
            <button
              onClick={() => history.goBack()}
              className="button button--cta button--nav--circle hvr-grow"
              type="button"
            >
              <i className="fas fa-arrow-left" />
            </button>
          </div>
          <span className="bidPage__header__text column">Edit Bid</span>
          <div className="column is-1" />
        </div>
        <div className="page__content columns is-mobile">
          <div className="form-wrapper column is-full-mobile is-four-fifths-tablet is-half-desktop">
            {state.isLoading ? (
              <div>Loading</div>
            ) : (
              <EditBidForm
                formData={state.formData}
                onSubmit={data => {
                  setState({ formData: data, showConfirm: true });
                }}
                onDelete={data => console.log('deleting', data)}
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default withRouter(EditBid);
