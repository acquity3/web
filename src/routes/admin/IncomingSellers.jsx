import React from 'react';

import UserDetails from './userDetails';

import './IncomingUsers.scss';

const IncomingSellers = ({ incomingSellers }) => {
  return (
    <div className="admin__content info">
      <div className="info__header">
        <span className="header--pretext">Sellers to approve</span>
      </div>
      <div className="incomingUsers__container">
        {incomingSellers.map(seller => (
          <UserDetails key={seller.id} user={seller} />
        ))}
      </div>
    </div>
  );
};

export default IncomingSellers;
