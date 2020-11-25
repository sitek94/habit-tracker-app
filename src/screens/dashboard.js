import * as React from 'react';
import { countBy } from 'lodash';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
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
import { FullPageSpinner, PieChartPlaceholder } from 'components/lib';
import { queryCache } from 'react-query';
import { BarChart } from 'components/bar-chart';
import { BarchartPlaceholder } from '../components/lib';
import { COMPLETED, FAILED } from 'data/constants';
import { UserScores } from 'components/user-scores';

// Styles
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.breakpoints.values.lg,
    height: '100%',
    padding: theme.spacing(4),
  },

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

  const {
    data: habits,
    isLoading: isLoadingHabits,
    isError: isHabitsError,
  } = useHabits();

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

  const { data: checkmarks } = useCheckmarks();
  console.log(checkmarks);
  /**
   * Charts
   *
   */

  if (isLoadingHabits || !checkmarks) {
    return <FullPageSpinner />;
  }

  if (isHabitsError) {
    return <div>Error</div>;
  }

  if (!habits.length) {
    return <NoHabitsScreen />;
  }

  // Render
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>

        {/* Chart placeholder */}
        <Grid item xs>
          <TopRowPaper>
            <PieChartPlaceholder />
          </TopRowPaper>
        </Grid>

        {/* User scores */}
        <Grid item>

          <TopRowPaper justifyContent="space-between">
            <UserScores checkmarks={checkmarks} />
          </TopRowPaper>
        </Grid>

        {/* Date picker */}
        <Grid item>
          <TopRowPaper>
            <DateRange
              ranges={dateRanges}
              onChange={handleDateRangesChange}
              showDateDisplay={false}
              moveRangeOnFirstSelection={false}
            />
          </TopRowPaper>
        </Grid>

        {/* Habits and checkmarks table */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <HabitsTable
              checkmarks={checkmarks}
              habits={habits}
              dates={selectedDates}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function TopRowPaper({ children, ...props }) {
  return (
    <Box
      clone
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={300}
      p={2}
      {...props}
    >
      <Paper>{children}</Paper>
    </Box>
  );
}

function AllHabitsBarchart({ dates = [] }) {
  // data, keys, indexBy, maxValue
  const { data: checkmarks, isLoading } = useCheckmarks();

  if (isLoading) {
    return <BarchartPlaceholder />;
  }

  let filteredData = checkmarks
    // First filter only the checkmarks for the selected dates
    .filter((checkmark) => dates.includes(checkmark.date));

  // Transform the data to the format accepted by bar chart
  let barchartData = dates.map((date) => {
    let values = filteredData
      // Find all checkmarks for the given date
      .filter((checkmark) => checkmark.date === date)

      // Get only checkmark values
      .map((checkmark) => checkmark.value);

    let counts = countBy(values);

    return {
      date,
      completed: counts[COMPLETED] || null,
      failed: -counts[FAILED] || null,
    };
  });

  return (
    <BarChart
      data={barchartData}
      keys={['completed', 'failed']}
      indexBy="date"
      maxValue={2}
    />
  );
}

export default Dashboard;
