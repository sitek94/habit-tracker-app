import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import * as React from 'react';
import { getComparator } from 'utils/misc';
import { HabitRow } from './habit-row';
import { isToday } from 'date-fns';

// Styles
const useStyles = makeStyles((theme) => ({
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
  highlight: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}));

// Sortable Table
function HabitsTable({ habits, dates }) {
  const classes = useStyles();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('position');

  // Handles sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Cells with option to sort the habits
  const sortableCells = [
    { id: 'position', label: 'Nº', align: 'center' },
    { id: 'name', label: 'Habit name', align: 'left' },
  ];

  // Currently selected date range cells
  const datesCells = dates.map((d) => {
    const date = new Date(d);

    return {
      id: date,
      label: format(date, 'd-MMM'),

      // If true applies highlight class to the cell
      isToday: isToday(date),
    };
  });

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
            {datesCells.map(({ id, label, isToday }) => (
              <Box key={id} clone>
                <TableCell
                  align="center"
                  className={isToday && classes.highlight}
                >
                  {label}
                </TableCell>
              </Box>
            ))}
          </TableRow>
        </TableHead>

        {/* Table body */}
        <TableBody>
          {sortedHabits.map((habit) => (
            <HabitRow key={habit.id} habit={habit} dates={dates} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

HabitsTable.propTypes = {
  habits: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
};

export { HabitsTable };
