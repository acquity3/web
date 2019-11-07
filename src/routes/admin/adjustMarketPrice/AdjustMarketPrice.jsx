import React from 'react';
import { useSelector } from 'react-redux';

import AdjustMarketPriceForm from './AdjustMarketPriceForm';
import './AdjustMarketPrice.scss';

const AdjustMarketPrice = () => {
  const { securities } = useSelector(rootState => rootState.securities);

  return (
    <div className="admin__content info">
      <div className="info__header">
        <span className="header--pretext">Adjust Market Price</span>
      </div>
      <div className="adjustMarketPrice">
        {securities.map(security => (
          <AdjustMarketPriceForm key={security.id} security={security} />
        ))}
      </div>
    </div>
  );
};

export default AdjustMarketPrice;
