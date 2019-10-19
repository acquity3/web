import React from 'react';
import Skeleton from 'react-loading-skeleton';

const InputDropdownSelectGhost = () => {
  return (
    <div className="input__dropdown__dropdown">
      <div className="dropdown__search dropdown-item">
        <input
          className="dropdown__search__input input"
          type="text"
          disabled
          placeholder="Search"
        />
      </div>
      <hr className="dropdown-divider" />
      <div className="dropdown__items">
        <div className="dropdown__items__item dropdown-item">
          <div className="dropdown__items__item__label">
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDropdownSelectGhost;
