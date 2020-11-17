import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { getComparator } from './helpers';

import SortableTableHead from './sortable-table-head';
import Checkmark from '../checkmark';

// Styles
const useStyles = makeStyles({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
});

// Sortable Table
function SortableTable({ rows, dates }) {
  const classes = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('position');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = rows.slice().sort(getComparator(order, orderBy));

  return (
    <TableContainer data-testid="table">
      <Table>
        <SortableTableHead
          dates={dates}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody data-testid={`sorted-${order}-by-${orderBy}`}>
          {sortedRows.map(({ id, name, position }) => (
            <TableRow key={id} hover>
              <TableCell align="center" className={classes.minWidth}>
                {position}
              </TableCell>

              <TableCell
                component="th"
                scope="row"
                align="left"
                className={classes.minWidth}
              >
                <Typography variant="body1">{name}</Typography>
              </TableCell>

              {dates.map(date => (
                <TableCell align="center" key={date}>
                  <Checkmark habitId={id} date={date} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SortableTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    })
  ).isRequired,

  // Dates 
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SortableTable;



