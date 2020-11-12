import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';

import { DATE_FORMAT } from 'data/constants';
import { useDatesRangeState } from 'features/dates-range';
import Checkmark from './checkmark/checkmark';

const useStyles = makeStyles({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
});

const HabitItem = ({ habit: { id, name } }) => {
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
        <Typography variant="body1">{name}</Typography>
      </TableCell>

      <TableCell align="left">
        {datesRange.map(date => (
          <Checkmark key={date.toISOString()} habitId={id} date={date.format(DATE_FORMAT)} />
        ))}
      </TableCell>

      <TableCell align="right" className={classes.minWidth}></TableCell>
    </TableRow>
  );
};

export default HabitItem;
