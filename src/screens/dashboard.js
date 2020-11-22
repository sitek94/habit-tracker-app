import * as React from 'react';

import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import {
  BarChart,
  barChartDataFrom,
  HeatmapCalendar,
  heatmapDataFrom,
} from 'pages/dashboard/charts';
import { useHabits } from 'hooks/useHabits';
import { useCheckmarks } from 'hooks/useCheckmarks';
import {
  eachDayOfInterval,
  lastDayOfWeek,
  lightFormat,
  startOfWeek,
} from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { HabitsTable } from 'components/habits-table';
import NoHabitsScreen from 'screens/no-habits';
import { FullPageSpinner } from 'components/lib';
import { queryCache } from 'react-query';

// Styles
const useStyles = makeStyles((theme) => ({
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

  const { data: habits, isError: isHabitsError } = useHabits();
  const { data: checkmarks, isError: isCheckmarksError } = useCheckmarks();

  /**
   * Date ranges 
   * 
   */
  const [dateRanges, setDateRanges] = React.useState([initialDateRange]);
  const handleDateRangesChange = ({ selection }) => {
    // This has to be array!
    setDateRanges([selection]);
  };

  const { startDate, endDate } = dateRanges[0];

  // Get dates that are currently selected
  const selectedDates = eachDayOfInterval({
    start: startDate,
    // If there is no end date selected use start date
    end: endDate ? endDate : startDate,

    // Format the dates to strings used in charts and table
  }).map((date) => lightFormat(date, 'yyyy-MM-dd'));


  /**
   * Charts
   * 
   */




  if (queryCache.isFetching) {
    return <FullPageSpinner />;
  }

  if (isCheckmarksError || isHabitsError) {
    return <div>Error</div>;
  }

  if (!habits.length) {
    return <NoHabitsScreen />
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
    <Box height="100%" p={4}>
      <Grid container spacing={3}>
        {/* Bar chart */}
        {/* <Grid item xs={12} sm={6} md={7} lg={8}>
        <Paper className={barChartStyles}>
          <BarChart
            data={barChartDataFrom(checkmarks, selectedDates)}
            keys={['completed', 'failed']}
            indexBy="date"
            maxValue={habits.length}
          />
        </Paper>
      </Grid> */}

        {/* Date range picker */}
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Paper className={dateRangeStyles}>
            <DateRange
              ranges={dateRanges}
              onChange={handleDateRangesChange}
              showDateDisplay={false}
              // moveRangeOnFirstSelection={true}
            />
          </Paper>
        </Grid>

        {/* Habits and checkmarks table */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <HabitsTable
              habits={habits}
              checkmarks={checkmarks}
              dates={selectedDates}
            />
          </Paper>
        </Grid>

        {/* Heatmap calendar */}
        {/* <Grid item xs={12}>
        <HeatmapCalendar data={heatmapDataFrom(checkmarks)} />
      </Grid> */}
      </Grid>
    </Box>
  );
}

export default Dashboard;
