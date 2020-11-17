import { useState } from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import {
  BarChart,
  barChartDataFrom,
  HeatmapCalendar,
  heatmapDataFrom,
} from 'pages/dashboard/charts';
import ErrorPage from 'components/error-page';
import Loader from 'components/loader';
import { useCheckmarks, useHabits } from 'context';
import {
  eachDayOfInterval,
  lastDayOfWeek,
  lightFormat,
  startOfWeek,
} from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import NoHabitsPage from 'pages/no-habits';
import SortableTable from './sortable-table';

// Styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
  },
  fixedHeight: {
    height: 300,
    overflow: 'hidden',
  },
  padding: {
    padding: theme.spacing(2),
  },
}));

// Initial date range that is selected
let initialDateRange = {
  startDate: startOfWeek(new Date()),
  endDate: lastDayOfWeek(new Date()),
  key: 'selection',
};

// Dashboard
function Dashboard() {
  const classes = useStyles();

  // Habits
  const {
    habits,
    isLoading: isLoadingHabits,
    isError: isHabitsError,
  } = useHabits();
  // Checkmarks
  const {
    checkmarks,
    isLoading: isLoadingCheckmarks,
    isError: isCheckmarksError,
  } = useCheckmarks();

  // Array of date ranges
  const [dateRanges, setDateRanges] = useState([initialDateRange]);
  const handleDateRangesChange = ({ selection }) => {
    setDateRanges(selection);
  };

  const { startDate, endDate } = dateRanges[0];

  // Get dates that are currently selected
  const selectedDates = eachDayOfInterval({
    start: startDate,
    // If there is no end date selected use start date
    end: endDate ? endDate : startDate,

    // Format the dates to strings used in charts and table
  }).map(date => lightFormat(date, 'yyyy-MM-dd'));

  // Fetching data from the database
  if (isLoadingCheckmarks || isLoadingHabits) {
    return <Loader />;
  }

  // Error
  if (isCheckmarksError || isHabitsError) {
    return (
      <ErrorPage
        title="Error when loading data"
        desription="Something went wrong when loading the data, please try again."
      />
    );
  }

  // User doesn't have any habits yet
  if (habits.length === 0) {
    return <NoHabitsPage />;
  }

  // Combine classes
  const barChartStyles = clsx(
    classes.paper,
    classes.fixedHeight
    // classes.padding
  );
  const dateRangeStyles = clsx(classes.paper, classes.fixedHeight);

  // Render
  return (
    <Grid container spacing={3}>
      {/* Bar chart */}
      <Grid item xs={12} sm={6} md={7} lg={8}>
        <Paper className={barChartStyles}>
          <BarChart
            data={barChartDataFrom(checkmarks, selectedDates)}
            keys={['completed', 'failed']}
            indexBy="date"
            maxValue={habits.length}
          />
        </Paper>
      </Grid>

      {/* Date range picker */}
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Paper className={dateRangeStyles}>
          <DateRange
            ranges={dateRanges}
            onChange={handleDateRangesChange}
            showDateDisplay={false}
            moveRangeOnFirstSelection={true}
          />
        </Paper>
      </Grid>

      {/* Habits and checkmarks table */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SortableTable rows={habits} dates={selectedDates} />
        </Paper>
      </Grid>

      {/* Heatmap calendar */}
      <Grid item xs={12}>
        <HeatmapCalendar data={heatmapDataFrom(checkmarks)} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
