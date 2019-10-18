import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import EditBidForm from './EditBidForm';

import './EditBid.scss';

// Temporary mock bid until hooked to backend
const mockBid = {
  id: '123tei2E2',
  bidNum: '2',
  stockName: 'Grab Holdings Pte Ltd',
  quantity: '3000',
  price: '6.89',
  timestamp: '1570866188'
};

const EditBid = ({ match, location, history }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    error: false,
    bidState: null
  });
  const bidId = match.params.id;
  const { bid } = location;

  // TODO: Retrieve bid with id from backend if undefined.
  // TODO: Throw error if unauthorized to edit given bid.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!bid) {
      setState({ bidState: mockBid, isLoading: false });
    } else {
      setState({ bidState: bid, isLoading: false });
    }
    return () => {};
  }, [bidId, bid]);

  return (
    <PageContainer>
      <div className="editBid page">
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
          <span className="editBid__header__text column">Edit Bid</span>
          <div className="column is-1" />
        </div>
        <div className="page__content columns is-mobile">
          <div className="form-wrapper column is-full-mobile is-four-fifths-tablet is-half-desktop">
            {state.isLoading ? (
              <div>Loading</div>
            ) : (
              <EditBidForm
                bid={state.bidState}
                onSubmit={data => console.log('submitting', data)}
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
