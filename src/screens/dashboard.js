import * as React from 'react';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import { BarChart } from 'components/bar-chart';
import { HabitsTable } from 'components/habits-table';
import { FullPageSpinner } from 'components/lib';
import { UserScores } from 'components/user-scores';
import { WeekPicker } from 'components/week-picker';
import { COMPLETED, FAILED } from 'data/constants';
import {
  eachDayOfInterval,
  endOfWeek,
  lightFormat,
  startOfWeek,
} from 'date-fns';
import { useCheckmarks } from 'hooks/useCheckmarks';
import { useHabits } from 'hooks/useHabits';
import { countBy } from 'lodash';
import { NoHabitsScreen } from 'screens/no-habits';
import { BarchartPlaceholder } from '../components/lib';
import diagramPlaceholder from 'images/diagram-placeholder.png';
import { useUserConfig } from 'context/user-config-context';
import { useLocale } from 'locale';

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

// Dashboard
function DashboardScreen() {
  const locale = useLocale();
  const classes = useStyles();

  // Habits data
  const {
    data: habits,
    isLoading: isLoadingHabits,
    isError: isHabitsError,
  } = useHabits();
  // Checkmarks data
  const { data: checkmarks, isError: isCheckmarksError } = useCheckmarks();

  // Date
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const start = startOfWeek(selectedDate, { locale });
  const end = endOfWeek(selectedDate, { locale });

  // Get dates that are currently selected
  const selectedDates = eachDayOfInterval({ start, end }).map((date) =>
    lightFormat(date, 'yyyy-MM-dd')
    );
    
  const { performanceGoal } = useUserConfig();

  if (isLoadingHabits) {
    return <FullPageSpinner />;
  }

  if (isHabitsError || isCheckmarksError) {
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
            <img alt="diagram" src={diagramPlaceholder} height="85%" />
          </TopRowPaper>
        </Grid>

        {/* User scores */}
        <Grid item>
          <TopRowPaper>
            <UserScores checkmarks={checkmarks} goal={performanceGoal} />
          </TopRowPaper>
        </Grid>

        {/* Date picker */}
        <Grid item>
          <TopRowPaper>
            <WeekPicker
              selectedDate={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
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

function TopRowPaper({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 330,
        overflow: 'hidden',
      }}
      component={Paper}
    >
      {children}
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

export { DashboardScreen };
