import * as React from 'react';
import { IconButton } from '@material-ui/core';
import {
  CheckBox as CompletedCheckmarkIcon,
  CheckBoxOutlineBlank as EmptyCheckmarkIcon,
  IndeterminateCheckBox as FailedCheckmarkIcon,
} from '@material-ui/icons';
import { useUpdateCheckmarkInDbMutate } from 'api/checkmarks';
import { COMPLETED, EMPTY, FAILED } from 'data/constants';
import { debounce } from 'lodash';

const variants = {
  completed: {
    icon: <CompletedCheckmarkIcon />,
    label: 'completed',
    color: 'primary',
  },
  failed: {
    icon: <FailedCheckmarkIcon />,
    label: 'failed',
    color: 'secondary',
  },
  empty: {
    icon: <EmptyCheckmarkIcon />,
    label: 'empty',
    color: 'default',
  },
};

function Checkmark({ id, initialValue, habitId, date, disabled }) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const updateCheckmarkInDbMutate = useUpdateCheckmarkInDbMutate();

  // Debounced update function
  const debouncedUpdate = React.useRef(
    debounce(({ id, newValue }) => {
      updateCheckmarkInDbMutate({
        checkmarkId: id,
        value: newValue,
        habitId,
        date,
      });
    }, 200)
  ).current;

  // Handles clicking on checkmark
  const handleClick = () => {
    const newValue = getNewValue(value);

    // Update the value locally, so that the icon changes
    setValue(newValue);
    // Update is debounced so when user is clicking very fast on the checkmark
    // only the last call will be invoked to hit the database.
    debouncedUpdate({ id, newValue });
  };

  const { icon, label, color } = variants[value];

  return (
    <IconButton
      aria-label={label}
      color={color}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
}

function getNewValue(currentValue) {
  const values = [COMPLETED, FAILED, EMPTY];

  return values[(values.indexOf(currentValue) + 1) % values.length];
}

Checkmark.propTypes = {
  // initialValue: PropTypes.oneOf(CHECKMARK_VALUES).isRequired,
  // onNewValue: PropTypes.func.isRequired,
  // disabled: PropTypes.bool,
};

export { Checkmark };
