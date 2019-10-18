import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './RoundDetailsGhost.scss';

const RoundDetailsGhost = () => {
  return (
    <div className="countdownDetails countdownDetails--ghost">
      <div className="countdownDetails__header">
        <Skeleton />
      </div>
      <div className="countdownDetails__text">
        <Skeleton />
      </div>
    </div>
  );
};

export default RoundDetailsGhost;
