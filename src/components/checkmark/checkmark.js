import PropTypes from 'prop-types';
import CheckmarkIcon from './checkmark-icon';
import { getCheckmarkLabel } from './helpers';
import { IconButton } from '@material-ui/core';
import { COMPLETED, FAILED } from 'data/constants';
import { useUpdateCheckmark } from 'hooks/useUpdateCheckmark';

function Checkmark({ habitId, value, date }) {

  const [updateCheckmark]  = useUpdateCheckmark();

  const nextValue = !value
    ? COMPLETED 
      : value === COMPLETED 
        ? FAILED
        : null;

  const nextLabel = getCheckmarkLabel(nextValue);

  const onClick = () => {
    updateCheckmark({ habitId, date, value: nextValue });
  }

  return (
    <IconButton
      data-testid="checkmark"
      aria-label={`Mark as ${nextLabel}?`}
      onClick={onClick}
      disabled={false}
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
