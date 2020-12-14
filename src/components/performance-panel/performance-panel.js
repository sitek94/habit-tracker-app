import * as React from 'react';
import { Box, Divider, Grid, Typography, useTheme } from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import { Pie } from '@nivo/pie';
import { calculateScore, createPieChartData } from './helpers';
import { useTranslation } from 'translations';
import { getWeek, isThisWeek, isToday, parseISO } from 'date-fns';

function PerformancePanel({ checkmarks, goal }) {
  const t = useTranslation();

  const todayValues = checkmarks
    .filter((c) => isToday(parseISO(c.date)))
    .map((c) => c.value);

  const thisWeekValues = checkmarks
    .filter((c) => isThisWeek(parseISO(c.date)))
    .map((c) => c.value);

  const lastWeekValues = checkmarks
    .filter((c) => getWeek(parseISO(c.date)) === getWeek(new Date()) - 1)
    .map((c) => c.value);

  const dataList = [
    { label: t('lastWeek'), data: createPieChartData(lastWeekValues) },
    { label: t('thisWeek'), data: createPieChartData(thisWeekValues) },
    { label: t('today'), data: createPieChartData(todayValues) },
  ];

  // Calculate all time user score
  const allTimeValues = checkmarks.map((d) => d.value);
  const allTimeScore = calculateScore(allTimeValues);

  return (
    <>
      {/* Title */}
      <Typography component="h2" variant="h6" color="primary">
        {t('yourPerformance')}
      </Typography>

      <FixedHeightDivider />

      {/* Pie charts */}
      <Grid container justifyContent="space-evenly">
        {dataList.map(({ label, data }) => {
          const completedValue = data[0].value;
          const hasReachedGoal = completedValue >= goal;

          return (
            <Grid item key={label}>
              <Label>{completedValue}%</Label>

              <ChartContainer>
                <PieChart data={data} />

                <CenteredBox>
                  {/* User has reached the goal */}
                  {hasReachedGoal ? (
                    <DoneIcon fontSize="large" color="primary" />
                  ) : (
                    <GoalLabel>
                      {t('goal')}:
                      <br />
                      <span>{goal}%</span>
                    </GoalLabel>
                  )}
                </CenteredBox>
              </ChartContainer>

              <Label variant="body2">{label}</Label>
            </Grid>
          );
        })}
      </Grid>

      <FixedHeightDivider />

      {/* Bottom text */}
      <Typography align="left" color="textSecondary">
        {t('overallPerformance')}: {allTimeScore}%
      </Typography>
    </>
  );
}

function FixedHeightDivider() {
  return (
    <Box
      clone
      sx={{
        alignSelf: 'stretch',
        height: '1px',
      }}
    >
      <Divider />
    </Box>
  );
}

function Label({ children, ...props }) {
  return (
    <Typography align="center" color="textSecondary" {...props}>
      {children}
    </Typography>
  );
}

function GoalLabel({ children }) {
  return (
    <Box
      clone
      sx={{
        // This margin is added so that the text looks more centered
        marginTop: '5px',
        fontSize: 12,
        lineHeight: 1.2,
      }}
    >
      <Typography
        variant="subtitle2"
        color="textSecondary"
        component="label"
        align="center"
      >
        {children}
      </Typography>
    </Box>
  );
}

const CHART_SIZE = 95;

function CenteredBox({ children }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: CHART_SIZE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
      }}
    >
      {children}
    </Box>
  );
}

function ChartContainer({ children }) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function PieChart({ data }) {
  const {
    palette: { primary, grey },
  } = useTheme();

  return (
    <Pie
      data={data}
      height={CHART_SIZE}
      width={CHART_SIZE}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      innerRadius={0.75}
      enableRadialLabels={false}
      enableSliceLabels={false}
      colors={[primary.main, grey[300]]}
    />
  );
}

export { PerformancePanel };
