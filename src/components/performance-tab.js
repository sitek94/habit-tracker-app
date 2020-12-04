import * as React from 'react';
import { useUserData } from 'context/user-config-context';
import {
  Box,
  FormControl,
  Hidden,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
} from '@material-ui/core';
import { TrackChanges as TrackChangesIcon } from '@material-ui/icons';
import { useUpdatePerformanceGoal } from 'api/user-data';

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
  const { performanceGoal } = useUserData();

  const updatePerformanceGoal = useUpdatePerformanceGoal();

  const handlePerformanceGoalChange = (event) => {

    // Update user's performance goal in the database
    updatePerformanceGoal(event.target.value);
  }

  return (
    <List disablePadding>
      {/* Performance gaol */}
      <Box sx={{ my: 1 }}>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <TrackChangesIcon color="primary" />
            </ListItemIcon>
          </Hidden>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-performance-goal-label">
              Performance Goal
            </InputLabel>

            {/* Mobile devices */}
            <Hidden smUp>
              <Select
                native
                label="Performance Goal"
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
            </Hidden>

            {/* Up mobile devices */}
            <Hidden xsDown>
              <Select
                label="Performance Goal"
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
            </Hidden>
          </FormControl>
        </ListItem>
      </Box>
    </List>
  );
}

export { PerformanceTab };
