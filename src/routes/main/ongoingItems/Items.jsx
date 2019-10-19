import React from 'react';
import Item from './Item';

import './Items.scss';

const OngoingItems = ({ ongoingItems, type }) => {
  return (
    <div className="ongoingItems">
      {ongoingItems.length === 0 ? (
        <div className="ongoingItems__emptyText">
          You have no ongoing {type}!
        </div>
      ) : (
        ongoingItems.map((item, i) => (
          <Item key={item.id || i} item={item} type={type} />
        ))
      )}
    </div>
  );
};

export default OngoingItems;
