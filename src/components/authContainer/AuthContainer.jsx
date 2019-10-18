import React from 'react';

import AuthArt from 'components/svgr/AuthArt';
import './AuthContainer.scss';

const AuthContainer = ({ children }) => {
  return (
    <div className="columns is-marginless is-centered">
      <div className="column is-two-thirds-desktop is-four-fifths-tablet is-full-mobile">
        <div className="columns is-variable is-6 is-marginless">
          <div className="column is-half is-hidden-mobile is-paddingless">
            <div className="art-container">
              <AuthArt />
            </div>
          </div>
          <div className="column is-half is-paddingless">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
