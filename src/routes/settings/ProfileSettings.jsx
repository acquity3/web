import React from 'react';

import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader/PageHeader';

const ProfileSettings = () => {
  const user = useUser();

  return (
    <PageContainer>
      <div className="accountSettings page">
        <PageHeader
          hasBackButton
          headerText="Account Settings"
          className="accountSettings"
        />
        <div className="page__content">
          <div className="message is-info">
            <div className="message-body">
              The ability to update account details will come in a later update.
              Please check back later.
            </div>
          </div>
          <div className="accountInfo">
            <div className="form">
              <div className="form__field field">
                <label htmlFor="fullName" className="label">
                  Full name
                </label>
                <div className="control">
                  <input
                    disabled
                    id="fullName"
                    className="input"
                    value={user.fullName}
                    type="text"
                    name="fullName"
                  />
                </div>
              </div>
              <div className="form__field field">
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="control">
                  <input
                    disabled
                    id="email"
                    className="input"
                    value={user.email}
                    type="text"
                    name="email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfileSettings;
