import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { COMPLETED, EMPTY, FAILED } from 'data/constants';
import { useAddCheckmark } from 'hooks/useAddCheckmark';
import { useDeleteCheckmark } from 'hooks/useDeleteCheckmark';
import { useUpdateCheckmarkValue } from 'hooks/useUpdateCheckmarkValue';
import { useQueryCache } from 'react-query';
import { CheckmarkIcon } from './checkmark-icon';
import { getCheckmarkLabel, getNextCheckmarkValue } from './helpers';

function Checkmark({ habitId, date, disabled }) {
  // Create checkmark id by joining the habit ID and the date
  // Each habit can only have one value for a given date so it ensures
  // uniqueness and we don't have to get the ID from the database.
  const id = React.useMemo(() => `${habitId}-${date}`, [habitId, date]);

  const cache = useQueryCache();
  const checkmarks = cache.getQueryData('checkmarks') || [];

  // Find the checkmark in cache
  const checkmark = checkmarks.find((checkmark) => checkmark.id === id) || null;

  const [addCheckmark] = useAddCheckmark();
  const [updateCheckmarkValue] = useUpdateCheckmarkValue();
  const [deleteCheckmark] = useDeleteCheckmark();

  const onClick = () => {
    // Add `completed` checkmark if it doesn't exists
    if (!checkmark) {
      addCheckmark({ id, habitId, date, value: COMPLETED });

      // Update checkmark to `failed` if it is `completed`
    } else if (checkmark.value === COMPLETED) {
      updateCheckmarkValue({ id, value: FAILED });

      // If checkmark is `failed` remove it from the database
    } else if (checkmark.value === FAILED) {
      deleteCheckmark(id);
    }
  };

  // If there is checkmark object, get its value otherwise it's `empty`
  const value = checkmark ? checkmark.value : EMPTY;

  // Use helper functions to get value of next label
  const nextLabel = getCheckmarkLabel(getNextCheckmarkValue(value));

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
  disabled: PropTypes.bool,
};

export { Checkmark };
