import PropTypes from 'prop-types';
import CheckmarkIcon from './checkmark-icon';
import { getCheckmarkLabel, getNextCheckmarkValue } from './helpers';
import { IconButton } from '@material-ui/core';
import { useCheckmarks } from 'context';
import { useFirebase } from 'services/firebase';
import { EMPTY } from 'data/constants';

function Checkmark({ habitId, date }) {
  const { checkmarks, isLoading } = useCheckmarks();
  const { db, user } = useFirebase();

  // Checks if there is a date and habit value for this date
  // Otherwise the checkmark is EMPTY
  const value = (checkmarks[date] && checkmarks[date][habitId]) || EMPTY;

  const nextValue = getNextCheckmarkValue(value);
  const nextLabel = getCheckmarkLabel(nextValue);

  // Updates the value of the checkmark to the next value
  const updateValue = async () => {
    try {
      const checkmarkRef = db.ref(`checkmarks/${user.uid}/${date}/${habitId}`);

      // When user sets a checkmark back to `empty` we remove the checkmark in the database
      if (nextValue === EMPTY) {
        await checkmarkRef.remove();
      } else {
        await checkmarkRef.set(nextValue);
      }
    } catch (error) {
      console.log('Error when updating the checkmark value', error);
    }
  };

  const handleClick = () => {
    updateValue();
  };

  return (
    <IconButton
      data-testid="checkmark"
      aria-label={`Mark as ${nextLabel}?`}
      onClick={handleClick}
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
