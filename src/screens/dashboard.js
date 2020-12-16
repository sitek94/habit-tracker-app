import * as React from 'react';
import { useCheckmarksQuery } from 'api/checkmarks';
import { useHabitsQuery } from 'api/habits';
import { NoHabitsScreen } from 'screens/no-habits';
import { useUser } from 'context/user-context';
import { useLocale } from 'localization';
import { WeekBarChart } from 'components/week-bar-chart';
import { HabitsTable } from 'components/habits-table';
import { FullPageErrorFallback, FullPageSpinner } from 'components/lib';
import { PerformancePanel } from 'components/performance-panel';
import { WeekPicker } from 'components/week-picker';
import { Box, Container, Grid, Hidden, Paper } from '@material-ui/core';
import {
  eachDayOfInterval,
  endOfWeek,
  lightFormat,
  startOfWeek,
} from 'date-fns';

/**
 * Dashboard Screen
 *
 * In the dashboard there are:
 * - Habits table - user can change the completion state of the habits.
 * - User Scores - shows the user's performance for last week, current week and today.
 * - Week Picker - user can pick the week which will update the table.
 *
 * ### TODO: All time performance chart or something like that.
 */
function DashboardScreen() {
  const locale = useLocale();

  // Habits data
  const {
    data: habits,
    error: habitsError,
    isLoading: isLoadingHabits,
  } = useHabitsQuery();
  // Checkmarks data
  const { data: checkmarks, error: checkmarksError } = useCheckmarksQuery();

  const { performanceGoal } = useUser();

  // Date
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const start = startOfWeek(selectedDate, { locale });
  const end = endOfWeek(selectedDate, { locale });

  // Get dates that are currently selected
  const selectedDates = eachDayOfInterval({ start, end }).map((date) =>
    lightFormat(date, 'yyyy-MM-dd')
  );

  // Filter checkmarks for the selected dates
  const selectedDatesCheckmarks = checkmarks.filter((checkmark) =>
    selectedDates.includes(checkmark.date)
  );

  // Loading habits data
  if (isLoadingHabits) {
    return <FullPageSpinner />;
  }

  const error = habitsError || checkmarksError;

  /**
   * Temporary fix
   *
   * Cancelled query is throwing `CancelledError`. In V3 cancellation will not throw an error anymore.
   * https://github.com/tannerlinsley/react-query/discussions/1179
   */
  const isCancelledError =
    checkmarksError && checkmarksError.hasOwnProperty('silent');

  // Ignore cancelled errors
  if (error && !isCancelledError) {
    return <FullPageErrorFallback error={error} />;
  }

  // There are no habits
  if (!habits.length) {
    return <NoHabitsScreen />;
  }

  // Bar chart
  const barChart = (
    <SmallPaper>
      <WeekBarChart
        goal={performanceGoal}
        dates={selectedDates}
        checkmarks={selectedDatesCheckmarks}
        habitsCount={habits.length}
      />
    </SmallPaper>
  );

  // Week picker
  const weekPicker = (
    <SmallPaper>
      <WeekPicker
        selectedDate={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    </SmallPaper>
  );

  // Habits and checkmarks table
  const habitsTable = (
    <LargePaper>
      <HabitsTable
        checkmarks={checkmarks}
        habits={habits}
        dates={selectedDates}
      />
    </LargePaper>
  );

  // Performance panel
  const performancePanel = (
    <SmallPaper>
      <PerformancePanel checkmarks={checkmarks} goal={performanceGoal} />
    </SmallPaper>
  );

  // Render
  return (
    <Box sx={{ height: '100%' }} clone>
      <Container disableGutters>
        {/* extra small screens */}
        <Hidden smUp>
          <Box sx={{ overflow: 'hidden' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {weekPicker}
              </Grid>
              <Grid item xs={12}>
                {habitsTable}
              </Grid>
              <Grid item xs={12}>
                {performancePanel}
              </Grid>
              <Grid item xs={12}>
                {barChart}
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        {/* small screens */}
        <Hidden smDown mdUp>
          <Box sx={{ p: 1 }}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
                {performancePanel}
              </Grid>
              <Grid item sm={6}>
                {weekPicker}
              </Grid>
              <Grid item sm={12}>
                {habitsTable}
              </Grid>
              <Grid item sm={12}>
                {barChart}
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        {/* medium screens and up */}
        <Hidden mdDown>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                {barChart}
              </Grid>
              <Grid item md={4}>
                {performancePanel}
              </Grid>
              <Grid item md={4}>
                {weekPicker}
              </Grid>
              <Grid item md={12}>
                {habitsTable}
              </Grid>
            </Grid>
          </Box>
        </Hidden>
      </Container>
    </Box>
  );
}

function LargePaper({ children }) {
  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

function SmallPaper({ children }) {
  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 330,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
}

export { DashboardScreen };
