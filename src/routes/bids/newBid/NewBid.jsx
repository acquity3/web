import React from 'react';
import { withRouter } from 'react-router-dom';
import PageContainer from 'components/pageContainer';
import NewBidForm from './NewBidForm';

const NewBid = ({ history }) => {
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
          <span className="editBid__header__text column">Bid Information</span>
          <div className="column is-1" />
        </div>
        <div className="page__content columns is-mobile">
          <div className="form-wrapper column is-full-mobile is-four-fifths-tablet is-half-desktop">
            <NewBidForm onSubmit={data => console.log('submitting', data)} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default withRouter(NewBid);
