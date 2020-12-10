import * as React from 'react';
import clsx from 'clsx';
import { TextField, makeStyles } from '@material-ui/core';
import { StaticDatePicker, PickersDay } from '@material-ui/lab';
import { useLocale } from 'localization';
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

const useStyles = makeStyles((theme) => ({
  day: {
    width: 40,
  },

  // Highlighting
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
  const locale = useLocale();

  const renderWeekPickerDay = (
    date,
    _selectedDates,
    PickersDayComponentProps
  ) => {
    if (!selectedDate) {
      return <PickersDay {...PickersDayComponentProps} />;
    }
    const weekStart = startOfWeek(selectedDate, { locale });
    const weekEnd = endOfWeek(selectedDate, { locale });
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
          classes.day,
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
    <StaticDatePicker
      minDate={MIN_DATE}
      maxDate={MAX_DATE}
      displayStaticWrapperAs="desktop"
      orientation="landscape"
      openTo="date"
      views={['year', 'month', 'date']}
      value={selectedDate}
      onChange={onChange}
      renderDay={renderWeekPickerDay}
      renderInput={(params) => <TextField {...params} variant="standard" />}
    />
  );
}

export { WeekPicker };
