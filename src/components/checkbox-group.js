import * as React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles({
  row: {
    justifyContent: 'space-around',
  },
  label: {
    // 14px is a value taken from .MuiOutlinedInput-input
    // so that the label is aligned equally to other labels
    padding: '0 14px',
  },

  disableMargin: {
    marginLeft: 0,
    marginRight: 0,
  },
});

function CheckboxGroup({ control, name, getValues, error, label, values }) {
  const classes = useStyles();

  const handleCheckbox = clickedValue => {
    const checkedValues = getValues()[name];

    const newValues = checkedValues?.includes(clickedValue)
      ? checkedValues?.filter(v => v !== clickedValue)
      : [...(checkedValues ?? []), clickedValue];

    return newValues;
  };

  return (
    <FormControl component="fieldset" fullWidth error={error}>
      <FormLabel component="legend" className={classes.label}>
        {label}
      </FormLabel>
      <FormGroup classes={{ row: classes.row }} row>
        <Controller
          name={name}
          control={control}
          render={props =>
            values.map((v, i) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => props.onChange(handleCheckbox(i))}
                    checked={props.value.includes(i)}
                  />
                }
                key={v}
                label={v.slice(0, 3)}
                labelPlacement="bottom"
                className={classes.disableMargin}
              />
            ))
          }
        />
      </FormGroup>
    </FormControl>
  );
}

CheckboxGroup.propTypes = {
  // React Hook Form
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  getValues: PropTypes.func.isRequired,

  // Array of values that is mapped over to render checkboxes
  values: PropTypes.array.isRequired,

  // Properties
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export { CheckboxGroup };
