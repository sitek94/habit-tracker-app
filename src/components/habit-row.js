import * as React from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from 'components/checkmark';
import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';
import { getDay, parseISO } from 'date-fns';
import { EMPTY } from 'data/constants';

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
  
  const { id, name, frequency /* position */ } = habit;

  return (
    <TableRow hover>
      {/* Position */}
      {/* <TableCell align="center" className={classes.minWidth}>
        {position + 1}
      </TableCell> */}

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
        const dateObj = parseISO(date);

        // Checkmark is disabled if the date is not tracked
        const disabled = !frequency.includes(getDay(dateObj));

        // Find checkmark
        const checkmark = checkmarks.find((d) => d.date === date);

        return (
          <TableCell align="center" key={date} className={classes.minWidth}>
            <Checkmark
              id={checkmark?.id || null}
              initialValue={checkmark?.value || EMPTY}
              habitId={id}
              date={date}
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
  }).isRequired,
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { HabitRow };
