import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { IconButton } from '@material-ui/core';
import { useFirebase } from 'services/firebase';
import { CHECKMARKS, EMPTY, getCheckmarkLabel } from 'data/constants';

import WarningIcon from '@material-ui/icons/Warning';
import CheckmarkIcon from './checkmark-icon';

function Checkmark({ habitId, date }) {
  const { db } = useFirebase();

  const [value, setValue] = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  console.log(status, value);

  /**
   * Next value is a next item in the array, when there no more items
   * it starts from index 0.
   */
  function getNextValue() {
    const nextIndex = (CHECKMARKS.indexOf(value) + 1) % CHECKMARKS.length;
    const nextValue = CHECKMARKS[nextIndex];

    return nextValue;
  }

  // Update checkmark value with next value in the array
  const handleClick = () => {
    updateCheckmarkValue(getNextValue());
  };

  // When component mounts it checks its value in the database
  useEffect(() => {
    // async function fetchCheckmarkValue() {
    //   setStatus('pending');

    //   try {
    //     const snapshot = await db
    //       .ref(`habitCheckmarks/${habitId}/${date}`)
    //       .once('value');

    //     setStatus('resolved');

    //     if (snapshot.exists()) {
    //       // Update there is data in the database
    //       setValue(snapshot.val());
    //     }
    //   } catch (error) {
    //     setStatus('error');

    //     console.log('Error when fetching checkmark value', error);
    //   }
    // }

    // fetchCheckmarkValue();
  }, [db, habitId, date]);

  // Updates checkmark value in the database, then updates the state
  const updateCheckmarkValue = async value => {
    setStatus('pending');

    try {
      const checkmarkRef = db.ref(`habitCheckmarks/${habitId}/${date}`);

      // When user sets a checkmark back to `empty` we remove the checkmark in the database
      if (value === EMPTY) {
        await checkmarkRef.remove();
      } else {
        await checkmarkRef.set(value);
      }
      setStatus('resolved');
      setValue(value);
    } catch (error) {
      setStatus('error');

      console.log('Error when updating the checkmark value', error);
    }
  };

  if (status === 'error') {
    return (
      <IconButton
        aria-label="Error when getting checkmark value"
        data-testid="checkmark-error"
        disabled
      >
        <WarningIcon />
      </IconButton>
    );
  }

  const nextCheckmarkLabel = getCheckmarkLabel(getNextValue());
  const isLoading = status === 'pending' || status === 'idle';

  return (
    <IconButton
      data-testid="checkmark-action"
      aria-label={`Mark habit as ${nextCheckmarkLabel}?`}
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
