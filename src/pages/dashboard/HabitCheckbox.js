import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { IconButton } from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  IndeterminateCheckBox as CheckboxFailedIcon,
} from '@material-ui/icons';

let values = ['empty', 'completed', 'skipped', 'failed'];

const HabitCheckbox = ({ initialValue = 'empty', disabled, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  console.log('initial:', initialValue, 'value', value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let icon;

  // Render icon depending on the value of the controller
  switch (value) {
    case 'completed':
      icon = <CheckBoxIcon style={{ color: green[500] }} />;
      break;

    case 'skipped':
      icon = <CheckBoxIcon style={{ color: yellow[700] }} />;
      break;

    case 'failed':
      icon = <CheckboxFailedIcon color="secondary" />;
      break;

    case 'empty':
    default:
      icon = <CheckBoxBlankIcon />;
      break;
  }

  const handleClick = () => {
    // Get next item from the values
    const currentIndex = values.indexOf(value);
    const nextIndex = (currentIndex + 1) % values.length;
    const nextValue = values[nextIndex];

    // Update value call event handler with new value value    
    setValue(nextValue);
    onValueChange(nextValue);
  };

  return (
    <IconButton onClick={handleClick} disabled={disabled}>
      {icon}
    </IconButton>
  );
};

HabitCheckbox.propTypes = {
  // Properties
  initialValue: PropTypes.oneOf(['empty', 'completed', 'skipped', 'failed']),
  disabled: PropTypes.bool,

  // Event handlers
  onClick: PropTypes.func
}

export default HabitCheckbox;
