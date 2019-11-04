import React, { useReducer } from 'react';

import ApiService from 'services/apiService';
import Avatar from 'components/avatar';
import ErrorMessage from 'components/errorMessage';
import { LINKEDIN_SEARCH_URL } from 'constants/urls';

import './UserDetails.scss';

const UserDetails = ({ user }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: false,
    isError: false,
    isApproved: false,
    isDenied: false
  });

  const handleApproveClick = async id => {
    setState({ isLoading: true });
    try {
      await ApiService.post(`/requests/${id}`);
      setState({ isApproved: true, isLoading: false });
    } catch (error) {
      setState({ isLoading: false, isError: true });
    }
  };

  const handleRejectClick = async id => {
    setState({ isLoading: true });
    try {
      await ApiService.delete(`/requests/${id}`);
      setState({ isDenied: true, isLoading: false });
    } catch (error) {
      setState({ isLoading: false, isError: true });
    }
  };

  return (
    <div className="incomingUsers">
      <div className="card incomingUsers__user">
        <div className="incomingUsers__user__content">
          <div className="media incomingUsers__user__details">
            <div className="media-left">
              <Avatar
                userName={user.fullName}
                profileImageUrl={user.displayImageUrl}
              />
            </div>
            <div className="media-content">
              <div className="incomingUsers__user__details__name">
                <span className="incomingUsers__user__details__name--name">
                  {user.fullName}
                </span>
                <a
                  href={`${LINKEDIN_SEARCH_URL}${user.fullName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-lg" />
                </a>
              </div>
              <div className="incomingUsers__user__details--email">
                {user.email}
              </div>
            </div>
          </div>
        </div>
        {state.isError && (
          <ErrorMessage message="Something went wrong. Try again." />
        )}
        {!state.isApproved && !state.isDenied && (
          <div className="incomingUsers__user__content incomingUsers__actions">
            <button
              onClick={() => handleApproveClick(user.id)}
              disabled={state.isLoading}
              className="button button--cta hvr-grow"
              type="button"
            >
              Approve
            </button>
            <button
              onClick={() => handleRejectClick(user.id)}
              disabled={state.isLoading}
              className="button button--danger hvr-grow"
              type="button"
            >
              Deny
            </button>
          </div>
        )}
        {state.isApproved && <ApprovedActionBlock />}
        {state.isDenied && <DeniedActionBlock />}
      </div>
    </div>
  );
};

const ApprovedActionBlock = () => {
  return (
    <div className="incomingUsers__user__content incomingUsers__actions incomingUsers__actions--performed">
      <div className="button is-static is-success is-outlined" type="button">
        Approved
      </div>
    </div>
  );
};

const DeniedActionBlock = () => {
  return (
    <div className="incomingUsers__user__content incomingUsers__actions incomingUsers__actions--performed">
      <div className="button is-static is-danger is-outlined" type="button">
        Denied
      </div>
    </div>
  );
};

export default UserDetails;
