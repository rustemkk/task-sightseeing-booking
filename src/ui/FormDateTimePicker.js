import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  formInput: {
    minWidth: 200,
  },
  label: {
    backgroundColor: '#fff',
    padding: 1,
  }
}));

const FormDateTimePicker = ({ errors, handleChange, label, name, values }) => {

  const s = useStyles();

  return (
    <InputMask
      mask="99/99/9999 99:99"
      value={get(values, name)}
      onChange={e => handleChange(name, e.target.value)}
    >
      {() =>
        <TextField
          className={s.formInput}
          error={!!get(errors, name)}
          fullWidth
          helperText={get(errors, name)}
          label={label}
          margin="dense"
          name={name}
          type="text"
          variant="outlined"
        />
      }
    </InputMask>
  );
};

FormDateTimePicker.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
};

export default FormDateTimePicker;