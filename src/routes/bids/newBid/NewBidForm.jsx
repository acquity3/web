import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import Select from 'react-dropdown-select';

import { validateMoneyString } from 'utils/moneyUtils';

import './NewBidForm.scss';

const customContentRenderer = ({ state }) => {
  const { values } = state;
  if (values[0]) {
    return <div className="security__display">{values[0].name}</div>;
  }

  return <div className="security__display--none">Select</div>;
};

const NewBidForm = ({ onSubmit, securities, formData }) => {
  const {
    register,
    handleSubmit: validateInputs,
    errors,
    watch,
    setValue
  } = useForm({
    mode: 'onBlur',
    defaultValues: formData || {}
  });
  const watchedFields = watch();

  return (
    <form
      className="form newBid"
      noValidate
      onSubmit={validateInputs(onSubmit)}
    >
      <input
        id="selectedSecurityId"
        className="is-hidden"
        type="text"
        name="selectedSecurityId"
        ref={register({
          required: 'This field is required'
        })}
      />
      <input
        id="selectedSecurityName"
        className="is-hidden"
        type="text"
        name="selectedSecurityName"
        ref={register({
          required: 'This field is required'
        })}
      />
      <label htmlFor="numShares" className="label">
        Number of shares
      </label>
      <div className="form__field field has-addons">
        <div className="control">
          <Select
            contentRenderer={customContentRenderer}
            className={`securities__dropdown ${
              errors.selectedSecurityId ? 'is-danger' : ''
            }`}
            valueField="id"
            labelField="name"
            searchBy="name"
            values={
              formData
                ? [
                    {
                      id: formData.selectedSecurityId,
                      name: formData.selectedSecurityName
                    }
                  ]
                : []
            }
            closeOnSelect
            searchable={false}
            placeholder=""
            options={securities}
            onChange={value => {
              setValue('selectedSecurityName', value[0].name, true);
              setValue('selectedSecurityId', value[0].id, true);
            }}
          />
        </div>
        <div className="control is-expanded">
          <input
            id="numShares"
            onKeyPress={evt => {
              const charCode = evt.which ? evt.which : evt.keyCode;
              if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
              }
            }}
            className={`input ${errors.numShares ? 'is-danger' : ''}`}
            type="text"
            name="numShares"
            placeholder="3000"
            ref={register({
              required: 'This field is required',
              validate: value => {
                const integerRegex = /^\d+$/;
                if (!value.match(integerRegex)) {
                  return 'Number of shares is invalid or should be a whole number';
                }
                if (value <= 0) {
                  return 'Number of shares must be bigger than 0';
                }

                return true;
              }
            })}
          />
          {errors.numShares && (
            <p className="help is-danger">{errors.numShares.message}</p>
          )}
        </div>
      </div>

      <label htmlFor="price" className="label">
        Maximum price per share
      </label>
      <div className="form__field field has-addons">
        <div className="control">
          <button
            tabIndex={-1}
            type="button"
            className="button is-static has-text-dark"
          >
            SGD
          </button>
        </div>
        <div className="control is-expanded">
          <input
            id="price"
            className={`input ${errors.price ? 'is-danger' : ''}`}
            onKeyPress={evt => {
              const charCode = evt.which ? evt.which : evt.keyCode;
              if (
                charCode > 31 &&
                (charCode !== 46 && (charCode < 48 || charCode > 57))
              ) {
                evt.preventDefault();
              }
            }}
            type="text"
            name="price"
            placeholder="0.00"
            ref={register({
              required: 'This field is required',
              validate: value => {
                if (!parseFloat(value) || !validateMoneyString(value)) {
                  return 'Price amount is invalid';
                }
                if (value <= 0) {
                  return 'Amount must be higher than 0';
                }

                if (value > 10000) {
                  return 'Amount must be lower than $10,000';
                }

                return true;
              }
            })}
          />
          {errors.price && (
            <p className="help is-danger">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="estimate">
        <div className="estimate__label">Estimated total</div>
        <div className="estimate__amount">
          <span className="estimate__amount--currency">SGD</span>
          <span className="estimate__amount--amount">
            {validateMoneyString(watchedFields.price)
              ? (watchedFields.price * watchedFields.numShares).toLocaleString()
              : '-'}
          </span>
        </div>
      </div>

      <div className="actions is-grouped field">
        <div className="control">
          <button type="submit" className="button--cta button hvr-grow">
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

NewBidForm.propTypes = {
  securities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NewBidForm;
