import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import clsx from 'clsx';
import {
  add,
  endOfWeek,
  endOfMonth,
  isSameDay,
  isWithinInterval,
  isThisYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import PickersDay from '@material-ui/lab/PickersDay';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  highlight: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  firstHighlight: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
}));

const MIN_DATE = new Date('2006-04-09');
const MAX_DATE = add(new Date(), { years: 10 });

function WeekPicker({ selectedDate, onChange }) {
  const classes = useStyles();

  const renderWeekPickerDay = (
    date,
    _selectedDates,
    PickersDayComponentProps
  ) => {
    if (!selectedDate) {
      return <PickersDay {...PickersDayComponentProps} />;
    }

    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const isWeekFirstDay = isSameDay(date, weekStart);
    const isWeekLastDay = isSameDay(date, weekEnd);
    const isMonthFirstDay = isSameDay(date, monthStart);
    const isMonthLastDay = isSameDay(date, monthEnd);

    const dayIsBetween = isWithinInterval(date, {
      start: weekStart,
      end: weekEnd,
    });
    
    const isCurrentYear = isThisYear(date);

    return (
      <PickersDay
        {...PickersDayComponentProps}
        disableMargin
        className={clsx(
          isCurrentYear && {
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isWeekFirstDay || isMonthFirstDay,
            [classes.endHighlight]: isWeekLastDay || isMonthLastDay,
          }
        )}
      />
    );
  };
  return (
    <LocalizaitonProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        displayStaticWrapperAs="desktop"
        orientation="landscape"
        openTo="date"
        value={selectedDate}
        onChange={onChange}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizaitonProvider>
  );
}

export { WeekPicker };
