import React from 'react';
import useForm from 'react-hook-form';

import { validateMoneyString } from 'utils';
import './EditBidForm.scss';

const mockStock = {
  name: 'Grabtastic',
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/en/1/12/Grab_%28application%29_logo.svg'
};

const StockFormAddon = ({ stock }) => {
  return (
    <div className="control">
      <button tabIndex={-1} type="button" className="button is-static">
        <img
          style={{ maxWidth: '80%', maxHeight: '80%' }}
          src={stock.iconUrl}
          alt={stock.name}
        />
      </button>
    </div>
  );
};

const EditBidForm = ({ onSubmit }) => {
  const { register, handleSubmit: validateInputs, errors, watch } = useForm({
    mode: 'onBlur'
  });
  const watchedFields = watch();

  return (
    <form className="form" noValidate onSubmit={validateInputs(onSubmit)}>
      <label htmlFor="numShares" className="label">
        Number of shares
      </label>
      <div className="form__field field has-addons">
        <StockFormAddon stock={mockStock} />
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
              required: 'This field is required'
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
          <button tabIndex={-1} type="button" className="button is-static">
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
              validate: value =>
                validateMoneyString(value) || 'Invalid price amount'
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
        <div className="control">
          <button type="button" className="button--danger button hvr-grow">
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditBidForm;
