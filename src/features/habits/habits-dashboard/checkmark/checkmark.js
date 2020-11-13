import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@material-ui/core';

import WarningIcon from '@material-ui/icons/Warning';
import CheckmarkIcon from './checkmark-icon';

import { getNextCheckmarkLabel } from 'helpers';
import { useCheckmarkValue } from './hooks';

function Checkmark({ habitId, date }) {
  const { status, value, updateValue } = useCheckmarkValue(
    habitId,
    date
  );

  if (status === 'error') {
    return (
      <Tooltip 
        data-testid="tooltip"
        title="Error when getting checkmark value"
      >
        <span>
          <IconButton
            aria-label="Error when getting checkmark value"
            data-testid="checkmark-error"
            disabled
          >
            <WarningIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  const nextValueLabel = getNextCheckmarkLabel(value);
  const isLoading = status === 'pending' || status === 'idle';

  return (
    <IconButton
      data-testid={`checkmark-${status}`}
      aria-label={`Mark as ${nextValueLabel}?`}
      onClick={updateValue}
      disabled={isLoading}
    >
      <CheckmarkIcon value={value} />
    </IconButton>
  );
}

Checkmark.propTypes = {
  date: PropTypes.string.isRequired,
  habitId: PropTypes.string.isRequired,
};

export default Checkmark;
