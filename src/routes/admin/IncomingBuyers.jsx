import React from 'react';

import UserDetails from './UserDetails';

import './IncomingUsers.scss';

const IncomingBuyers = ({ incomingBuyers }) => {
  return (
    <div className="admin__content info">
      <div className="info__header">
        <span className="header--pretext">Buyers to approve</span>
      </div>
      <div className="incomingUsers__container">
        {incomingBuyers.map(buyer => (
          <UserDetails key={buyer.id} user={buyer} />
        ))}
      </div>
    </div>
  );
};

export default IncomingBuyers;
