import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'components/pageContainer/PageContainer';

import './EditBid.scss';
import EditBidForm from './EditBidForm';

const EditBid = ({ _match, _location, history }) => {
  // const bidId = match.params.id;
  // const { bid } = location;

  // TODO: Retrieve bid with id from backend if undefined.
  // TODO: Throw error if unauthorized to edit given bid.

  return (
    <Container>
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
            <EditBidForm onSubmit={data => console.log(data)} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(EditBid);
