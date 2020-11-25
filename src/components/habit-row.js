import * as React from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from 'components/checkmark';
import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';
import { getDay, isFuture } from 'date-fns';
import { useAddCheckmark } from 'hooks/useAddCheckmark';
import { useDeleteCheckmark } from 'hooks/useDeleteCheckmark';
import { useUpdateCheckmarkValue } from 'hooks/useUpdateCheckmarkValue';
import { COMPLETED, EMPTY, FAILED } from 'data/constants';

// Styles
const useStyles = makeStyles((theme) => ({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
}));

// Habit row
function HabitRow({ habit, dates, checkmarks }) {
  const classes = useStyles();

  const { id, name, frequency, position } = habit;

  const [addCheckmark] = useAddCheckmark();
  const [updateCheckmarkValue] = useUpdateCheckmarkValue();
  const [deleteCheckmark] = useDeleteCheckmark();

  const handleCheckmarkClick = React.useCallback(
    ({ checkmarkId, date, value }) => {
      // Add `completed` checkmark if it doesn't exists
      if (value === EMPTY) {
        addCheckmark({ habitId: id, date, value: COMPLETED });

        // Update checkmark to `failed` if it is `completed`
      } else if (value === COMPLETED) {
        updateCheckmarkValue({ id: checkmarkId, value: FAILED });

        // If checkmark is `failed` remove it from the database
      } else if (value === FAILED) {
        deleteCheckmark(checkmarkId);
      }
    },
    [id, addCheckmark, updateCheckmarkValue, deleteCheckmark]
  );

  return (
    <TableRow hover>
      {/* Position */}
      <TableCell align="center" className={classes.minWidth}>
        {position + 1}
      </TableCell>

      {/* Name */}
      <TableCell
        component="th"
        scope="row"
        align="left"
        className={classes.minWidth}
      >
        <Typography variant="body1">{name}</Typography>
      </TableCell>

      {/* Dates */}
      {dates.map((date) => {
        const dateObj = new Date(date);

        // Checkmark is disabled if the date is not tracked or date is in the future
        const disabled =
          !frequency.includes(getDay(dateObj)) || isFuture(dateObj);
          
        // Get checkmark's `id` and `value`. If `undefined` use default values.
        const { id, value } = checkmarks.find((d) => d.date === date) || {
          id: '',
          value: EMPTY,
        };

        return (
          <TableCell align="center" key={date}>
            <Checkmark
              value={value}
              onClick={() =>
                handleCheckmarkClick({ checkmarkId: id, value, date })
              }
              disabled={disabled}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}

HabitRow.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    frequency: PropTypes.arrayOf(PropTypes.number).isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired,
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { HabitRow };
