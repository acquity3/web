import React from 'react';

import Avatar from 'components/avatar';
import { LINKEDIN_SEARCH_URL } from 'constants/urls';

import './UserDetails.scss';

const UserDetails = ({ user }) => {
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
        <div className="incomingUsers__user__content incomingUsers__actions">
          <button className="button button--cta hvr-grow" type="button">
            Approve
          </button>
          <button className="button button--danger hvr-grow" type="button">
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
