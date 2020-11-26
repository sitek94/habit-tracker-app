import * as React from 'react';
import { Box, Divider, Grid, Typography, useTheme } from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import { Pie } from '@nivo/pie';
import {
  calculateScore,
  createScoreType,
  getScoreTypeDataList,
  isCheckmarkLastWeek,
  isCheckmarkThisWeek,
  isCheckmarkToday,
} from './helpers';

// Score types that we track is 'last week', 'this week' and 'today'
const scoreTypeList = [
  createScoreType('Last week', isCheckmarkLastWeek),
  createScoreType('This week', isCheckmarkThisWeek),
  createScoreType('Today', isCheckmarkToday),
];

function UserScores({ checkmarks, goal }) {
  // Use user's checkmarks and score types list to generate the data for pie chart
  const scoreTypeDataList = getScoreTypeDataList(checkmarks, scoreTypeList);

  // Calculate all time user score
  const allTimeValues = checkmarks.map((d) => d.value);
  const allTimeScore = calculateScore(allTimeValues);

  return (
    <>
      {/* Title */}
      <Typography component="h2" variant="h6" color="primary">
        Your Performance
      </Typography>

      <FixedHeightDivider />

      {/* Pie charts */}
      <Grid container>
        {scoreTypeDataList.map(({ label, data }) => {
          const completedValue = data[0].value;
          const hasReachedGoal = completedValue > goal;

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
                    <GoalLabel>{goal}%</GoalLabel>
                  )}
                </CenteredBox>
              </ChartContainer>

              <Label>{label}</Label>
            </Grid>
          );
        })}
      </Grid>

      <FixedHeightDivider />

      {/* Bottom text */}
      <Typography align="left" color="textSecondary">
        Overall All Time Performance: {allTimeScore}%
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

function Label({ children }) {
  return (
    <Typography align="center" color="textSecondary">
      {children}
    </Typography>
  );
}

function GoalLabel({ children }) {
  return (
    <Box
      clone
      sx={{
        fontSize: 12,
        lineHeight: 1,
      }}
    >
      <Typography
        variant="subtitle2"
        color="textSecondary"
        component="label"
        align="right"
      >
        Goal:
        <br />
        <span>{children}</span>
      </Typography>
    </Box>
  );
}

const CHART_SIZE = 100;

function CenteredBox({ children }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: CHART_SIZE,
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
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      innerRadius={0.75}
      enableRadialLabels={false}
      enableSliceLabels={false}
      colors={[primary.main, grey[300]]}
    />
  );
}

export { UserScores };
