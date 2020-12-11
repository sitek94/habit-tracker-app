import * as React from 'react';
import { useUser } from 'context/user-context';
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { TrackChanges as TrackChangesIcon } from '@material-ui/icons';
import { useUpdatePerformanceGoal } from 'api/user-data';
import { useTranslation } from 'translations';

// Create array of available values  [5, 10, ..., 100]
const performanceGoalValues = Array.from(Array(20)).map((_, i) => {
  const value = i * 5 + 5;
  return {
    value,
    label: `${value}%`,
  };
});

/**
 * Performance Tab
 *
 * User can update performance related settings. For now the only setting
 * that can be changed is performance goal.
 */
function PerformanceTab() {
  const { performanceGoal } = useUser();
  const t = useTranslation();

  const updatePerformanceGoal = useUpdatePerformanceGoal();

  const handlePerformanceGoalChange = (event) => {
    // Update user's performance goal in the database
    updatePerformanceGoal(event.target.value);
  };

  // Media queries
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <List disablePadding>
      {/* Performance gaol */}
      <Box sx={{ my: 1 }}>
        <ListItem>
          {!isXs && (
            <ListItemIcon>
              <TrackChangesIcon color="primary" />
            </ListItemIcon>
          )}

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-performance-goal-label">
              {t('dailyGoal')}
            </InputLabel>

            {/* Mobile devices */}
            {isXs && (
              <Select
                id="mobile"
                native
                label={t('dailyGoal')}
                labelId="select-performance-goal-label"
                value={performanceGoal}
                onChange={handlePerformanceGoalChange}
              >
                {performanceGoalValues.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            )}

            {/* Up mobile devices */}
            {!isXs && (
              <Select
                id="mobile up"
                label={t('dailyGoal')}
                labelId="select-performance-goal-label"
                value={performanceGoal}
                onChange={handlePerformanceGoalChange}
              >
                {performanceGoalValues.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </ListItem>
      </Box>
    </List>
  );
}

export { PerformanceTab };
