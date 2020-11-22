import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { CHECKMARK_VALUES } from 'data/constants';
import { useUpdateCheckmark } from 'hooks/useUpdateCheckmark';
import { CheckmarkIcon } from './checkmark-icon';
import { getCheckmarkLabel, getNextCheckmarkValue } from './helpers';

function Checkmark({ habitId, date, value, disabled }) {
  const nextValue = getNextCheckmarkValue(value);
  const nextLabel = getCheckmarkLabel(nextValue);

  const [updateCheckmark] = useUpdateCheckmark();

  const onClick = () => {
    updateCheckmark({ habitId, date, value: nextValue });
  };

  return (
    <IconButton
      data-testid="checkmark"
      aria-label={`Mark as ${nextLabel}?`}
      onClick={onClick}
      disabled={disabled}
    >
      <CheckmarkIcon value={value} />
    </IconButton>
  );
}

Checkmark.propTypes = {
  habitId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.oneOf(CHECKMARK_VALUES),
  disabled: PropTypes.bool,
};

export {Checkmark};
