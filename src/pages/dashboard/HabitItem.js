import dayjs from 'libraries/dayjs';

import { TableCell, TableRow } from '@material-ui/core';

import { useDatesRangeState } from 'features/dates-range';
import { useFirebase } from 'services/firebase';

import HabitCheckbox from './HabitCheckbox';
import { useEffect, useState } from 'react';

const HabitItem = ({ id, title, trackedDays }) => {
  const { db, app } = useFirebase();
  const { startDate, endDate, datesRange } = useDatesRangeState();

  const [fetchedDays, setFetchedDays] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      
      try {
        // Construct array with days IDs to fetch
        const daysIds = datesRange.map(d => d.format('DD-MM-YYYY'));

        const docs = await db
          // Find the habit
          .collection('habits')
          .doc(id)
          // Get days docs with matching IDs
          .collection('days')
          .where(app.firestore.FieldPath.documentId(), 'in', daysIds)
          .get();
          
        let days = [];
        docs.forEach(doc => {
          days.push(doc.data());
        });
        setFetchedDays(days);
      } catch (error) {
        console.log(error);
      }

    }

    fetchDays();

  }, [app, db, id, startDate, endDate, datesRange]);

  const updateDay = async (date, value) => {
    // Each day in database has a key that is a date in format DD-MM-YYYY
    const dayId = date.format('DD-MM-YYYY');

    db
      //Find the habit
      .collection('habits')
      .doc(id)
      // Find and update the day
      .collection('days')
      .doc(dayId)
      .set({
        value,
        date: date.toISOString(),
      });
  };

  const renderHabitCheckbox = date => {
    const weekdayName = date.format('dddd');

    // Tracked days of the habit are stored as string (Monday, Tuesday, etc.)
    // Use weekday name to check whether given date should be tracked.
    const isDateTracked = trackedDays.includes(weekdayName);

    // If date is in the future the checkbox should be disabled
    const isDateFuture = date.isAfter(dayjs(), 'day');

    // Find matching day in the days fetched from database
    const matchingDay = fetchedDays.find(d => {
      return dayjs(d.date).isSame(date, 'day');
    });

    const initialValue = isDateTracked 
      ? (matchingDay ? matchingDay.value : 'empty')
      : 'empty';

    const handleValueChange = value => {
      updateDay(date, value);
    };

    return (
      <HabitCheckbox
        initialValue={initialValue}
        disabled={!isDateTracked || isDateFuture}
        onValueChange={handleValueChange}
      />
    );
  };

  return (
    <TableRow>
      <TableCell>{title}</TableCell>

      {datesRange.map(date => (
        <TableCell key={date.format()}>{renderHabitCheckbox(date)}</TableCell>
      ))}
    </TableRow>
  );
};

export default HabitItem;
