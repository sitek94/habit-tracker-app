import PropTypes from 'prop-types';

import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';

import { DATE_FORMAT } from 'data/constants';
import { useDatesRangeState } from 'features/dates-range';

import Checkmark from '../checkmark';

const useStyles = makeStyles({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
});

function DashboardItem({ habitId, habitName }) {
  const classes = useStyles();

  const { datesRange } = useDatesRangeState();

  return (
    <TableRow hover>
      <TableCell
        component="th"
        scope="row"
        align="left"
        className={classes.minWidth}
      >
        <Typography variant="body1">{habitName}</Typography>
      </TableCell>

      <TableCell align="left">
        {datesRange.map(date => (
          <Checkmark key={date.toISOString()} habitId={habitId} date={date.format(DATE_FORMAT)} />
        ))}
      </TableCell>
    </TableRow>
  );
};

DashboardItem.propTypes = {
  habitId: PropTypes.string.isRequired,
  habitName: PropTypes.string.isRequired,
}

export default DashboardItem;
