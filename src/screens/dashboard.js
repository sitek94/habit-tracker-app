import * as React from 'react';
import { useCheckmarks } from 'api/checkmarks';
import { useHabits } from 'api/habits';
import { NoHabitsScreen } from 'screens/no-habits';
import { useUserData } from 'context/user-config-context';
import { useLocale } from 'locale';
import { WeekBarChart } from 'components/week-bar-chart';
import { HabitsTable } from 'components/habits-table';
import { FullPageSpinner } from 'components/lib';
import { UserScores } from 'components/user-scores';
import { WeekPicker } from 'components/week-picker';
import {
  Box,
  Container,
  Grid,
  Hidden,
  Paper,
} from '@material-ui/core';
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
    isLoading: isLoadingHabits,
    isError: isHabitsError,
  } = useHabits();
  // Checkmarks data
  const { data: checkmarks, isError: isCheckmarksError } = useCheckmarks();

  const { performanceGoal } = useUserData();

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

  if (isLoadingHabits) {
    return <FullPageSpinner />;
  }

  if (isHabitsError || isCheckmarksError) {
    return <div>Error</div>;
  }

  if (!habits.length) {
    return <NoHabitsScreen />;
  }

  const barChart = (
    <SmallPaper>
      <WeekBarChart
        dates={selectedDates}
        checkmarks={selectedDatesCheckmarks}
        habitsCount={habits.length}
      />
    </SmallPaper>
  );

  const weekPicker = (
    <SmallPaper>
      <WeekPicker
        selectedDate={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    </SmallPaper>
  );

  const habitsTable = (
    <LargePaper>
      <HabitsTable
        checkmarks={checkmarks}
        habits={habits}
        dates={selectedDates}
      />
    </LargePaper>
  );

  const userScores = (
    <SmallPaper>
      <UserScores checkmarks={checkmarks} goal={performanceGoal} />
    </SmallPaper>
  );

  // Render
  return (
    <Box sx={{ height: '100%' }} clone>
      <Container disableGutters>
        {/* Mobile screens */}
        <Hidden smUp>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {weekPicker}
            </Grid>
            <Grid item xs={12}>
              {habitsTable}
            </Grid>
            <Grid item xs={12}>
              {userScores}
            </Grid>
            <Grid item xs={12}>
              {barChart}
            </Grid>
          </Grid>
        </Hidden>

        {/* Small screens */}
        <Hidden smDown mdUp>
          <Box sx={{ p: 1 }}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
                {userScores}
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

        {/* Large screens up */}
        <Hidden mdDown>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                {barChart}
              </Grid>
              <Grid item md={4}>
                {userScores}
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
