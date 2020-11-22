import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import * as React from 'react';
import { getComparator } from 'utils/misc';
import { HabitRow } from './habit-row';

// Styles
const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  positionPadding: {
    padding: '0 0 0 12px',
  },
});

// Sortable Table
function HabitsTable({ habits, dates, checkmarks }) {
  const classes = useStyles();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('position');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortableCells = [
    { id: 'position', label: 'Nº', align: 'center' },
    { id: 'name', label: 'Habit name', align: 'left' },
  ];

  const cells = dates.map((date) => ({
    id: date,
    label: format(new Date(date), 'd-MMM'),
  }));

  const sortedHabits = habits.slice().sort(getComparator(order, orderBy));

  return (
    <TableContainer data-testid="table">
      <Table>
        {/* Table head */}
        <TableHead>
          <TableRow>
            {/* Sortable cells */}
            {sortableCells.map(({ id, label, align }) => (
              <TableCell
                key={id}
                align={align}
                sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : 'asc'}
                  onClick={() => handleRequestSort(id)}
                >
                  {label}
                  {orderBy === id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}

            {/* Normal cells */}
            {cells.map(({ id, label }) => (
              <TableCell key={id}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table body */}
        <TableBody>
          {sortedHabits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              dates={dates}
              checkmarks={checkmarks ? checkmarks[habit.id] : null}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

HabitsTable.propTypes = {
  habits: PropTypes.array.isRequired,
  checkmarks: PropTypes.object.isRequired,
  dates: PropTypes.array.isRequired,
};

export { HabitsTable };

