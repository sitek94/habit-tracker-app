import * as React from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from 'components/checkmark';
import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';
import { getDay } from 'date-fns';

// Styles
const useStyles = makeStyles(theme => ({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
}));

// Habit row
function HabitRow({ habit, dates }) {
  const classes = useStyles();

  const { id, name, frequency, position } = habit;

  return (
    <TableRow hover>
      {/* Position */}
      <TableCell align="center" className={classes.minWidth}>
        {position}
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
        // Check if the date is tracked
        const isTracked = frequency.includes(getDay(new Date(date)));

        return (
          <TableCell align="center" key={date}>
            <Checkmark habitId={id} date={date} disabled={!isTracked} />
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
    // position: PropTypes.number.isRequired,
  }).isRequired,
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { HabitRow };
