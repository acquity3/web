import React from 'react';
import Select from 'react-dropdown-select';

import './InputDropdownSelect.scss';

const customContentRenderer = ({ state }) => {
  const { values } = state;
  if (values[0]) {
    return <div className="input__dropdown__display">{values[0].name}</div>;
  }

  return <div className="input__dropdown__display--none">Select</div>;
};

const InputDropdownSelect = ({
  onChange,
  isLoading,
  isError,
  options,
  values = []
}) => {
  return (
    <Select
      contentRenderer={customContentRenderer}
      className={`input__dropdown ${isError ? 'is-danger' : ''} ${
        isLoading ? 'is-loading' : ''
      }`}
      valueField="id"
      labelField="name"
      searchBy="name"
      values={values}
      closeOnSelect
      searchable={false}
      placeholder=""
      options={options}
      onChange={onChange}
    />
  );
};

export default InputDropdownSelect;
