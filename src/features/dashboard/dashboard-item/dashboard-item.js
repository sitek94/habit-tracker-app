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

function DashboardItem({ id, name, position }) {
  const classes = useStyles();

  const { datesRange } = useDatesRangeState();

  return (
    <TableRow hover>
      <TableCell  align="center" className={classes.minWidth}>
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

      {datesRange.map(date => (
        <TableCell align="left" key={date.toISOString()}>
          <Checkmark habitId={id} date={date.format(DATE_FORMAT)} />
        </TableCell>
      ))}
    </TableRow>
  );
}

DashboardItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DashboardItem;
