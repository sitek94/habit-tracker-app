import PropTypes from 'prop-types';
import {
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import dayjs from 'services/dayjs';

const weekdays = dayjs.weekdaysShort(dayjs());

const headCells = [
  // Only sortable options: by position and name
  { id: 'position', numeric: false, isSortable: true, label: 'Nº' },
  { id: 'name', numeric: false, isSortable: true, label: 'Habit name' },

  // Days of the week [Monday - Sunday]
  ...weekdays.map(day => ({
    id: day,
    numeric: false,
    isSortable: false,
    label: day,
  })),
];

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

// Sortable Table Head
function SortableTableHead({ dates, order, orderBy, onRequestSort }) {
  const classes = useStyles();

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const headCells = [
     // Only sortable options: by position and name
    { id: 'position', numeric: false, isSortable: true, label: 'Nº' },
    { id: 'name', numeric: false, isSortable: true, label: 'Habit name' },
    // Days of the week [Monday - Sunday]
      ...dates.map(day => ({
      id: day,
      numeric: false,
      isSortable: false,
      label: dayjs(day).format('DD-MMM'),
    })),
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label, numeric, isSortable }) => (
          <TableCell
            key={id}
            align={id === 'name' ? 'left' : 'center'}
            className={id === 'position' ? classes.positionPadding : ''}
            sortDirection={orderBy === id ? order : false}
          >
            {isSortable ? (
              <TableSortLabel
                data-testid={id}
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

SortableTableHead.propTypes = {
  // Properties
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,

  // Event handlers
  onRequestSort: PropTypes.func.isRequired,
};

export default SortableTableHead;
