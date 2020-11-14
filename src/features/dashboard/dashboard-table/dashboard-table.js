import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableSortLabel,
  makeStyles,
} from '@material-ui/core';

import DashboardItem from '../dashboard-item';

import dayjs from 'services/dayjs';
import { useState } from 'react';

const weekdays = dayjs.weekdaysShort(dayjs());

const headCells = [
  { id: 'position', numeric: false, isSortable: true, label: 'Nº' },
  { id: 'name', numeric: false, isSortable: true, label: 'Habit name' },
  ...weekdays.map(day => ({
    id: day,
    numeric: false,
    isSortable: false,
    label: day,
  })),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Table head
function SortableTableHead({ classes, order, orderBy, onRequestSort }) {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label, numeric, isSortable }) => (
          <TableCell
            key={id}
            align={numeric ? 'right' : 'left'}
            style={{ padding: id === 'position' ? '0 0 0 12px' : null }}
            sortDirection={orderBy === id ? order : false}
          >
            {isSortable ? (
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
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
            ) : (
              label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
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
}));


function DashboardTable({ rows }) {
  const classes = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('position');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  return (
    <TableContainer>
      <Table>
        <SortableTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {rows.sort(getComparator(order, orderBy)).map(({ id, name, position }) => (
            <DashboardItem key={id} id={id} name={name} position={position} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DashboardTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DashboardTable;
