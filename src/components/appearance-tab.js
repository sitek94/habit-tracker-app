import * as React from 'react';
import { isDefaultTheme, colors } from 'theme';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Hidden,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  useTheme,
  Switch,
  Divider,
} from '@material-ui/core';
import {
  FiberManualRecord as FiberManualRecordIcon,
  Brightness4 as Brightness4Icon,
  FormatColorReset as FormatColorResetIcon,
} from '@material-ui/icons';
import {
  useUpdatePrimaryColor,
  useUpdateSecondaryColor,
  useUpdateDarkMode,
  useRemoveTheme,
} from 'api/appearance';

/**
 * Appearance Tab
 *
 * A tab where user can change appearance settings of the app.
 */
function AppearanceTab({ disabled }) {
  const theme = useTheme();

  const updatePrimaryColor = useUpdatePrimaryColor();
  const updateSecondaryColor = useUpdateSecondaryColor();
  const updateDarkMode = useUpdateDarkMode();
  const resetTheme = useRemoveTheme();

  // Change primary color
  const handlePrimaryColorChange = (event) => {
    if (!event) return;

    const primaryColor = event.target.value;

    if (!primaryColor) return;
    if (theme.primaryColor.id === primaryColor) return;

    updatePrimaryColor(primaryColor);
  };

  // Change secondary color
  const handleSecondaryColorChange = (event) => {
    if (!event) return;

    const secondaryColor = event.target.value;

    if (!secondaryColor) return;
    if (theme.secondaryColor.id === secondaryColor) return;

    updateSecondaryColor(secondaryColor);
  };

  // Change dark mode
  const handleDarkModeChange = (event) => {
    if (!event) return;

    const dark = event.target.checked;

    if (theme.dark === dark) return;

    updateDarkMode(dark);
  };

  // Reset theme to default
  const handleResetThemeClick = () => {
    if (isDefaultTheme(theme)) return;

    resetTheme();
  };

  return (
    <List disablePadding>
      {/* Primary color */}
      <Box sx={{ my: 1 }}>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
          </Hidden>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-primary-color-label">
              Primary color
            </InputLabel>

            {/* Mobile devices */}
            <Hidden smUp>
              <Select
                native
                label="Primary color"
                labelId="select-primary-color-label"
                value={theme.primaryColor.id}
                onChange={handlePrimaryColorChange}
              >
                {Object.keys(colors).map((color) => {
                  color = colors[color];

                  return (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  );
                })}
              </Select>
            </Hidden>

            {/* Up mobile devices */}
            <Hidden xsDown>
              <Select
                label="Primary color"
                labelId="select-primary-color-label"
                value={theme.primaryColor.id}
                onChange={handlePrimaryColorChange}
              >
                {Object.keys(colors).map((color) => {
                  color = colors[color];

                  return (
                    <MenuItem key={color.id} value={color.id}>
                      {color.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Hidden>
          </FormControl>
        </ListItem>
      </Box>

      {/* Secondary color */}
      <Box sx={{ my: 1 }}>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <FiberManualRecordIcon color="secondary" />
            </ListItemIcon>
          </Hidden>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-secondary-color-label">
              Secondary color
            </InputLabel>

            {/* Mobile devices */}
            <Hidden smUp>
              <Select
                native
                label="Secondary color"
                labelId="select-secondary-color-label"
                value={theme.secondaryColor.id}
                onChange={handleSecondaryColorChange}
              >
                {Object.keys(colors).map((color) => {
                  color = colors[color];

                  return (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  );
                })}
              </Select>
            </Hidden>

            {/* Up mobile devices */}
            <Hidden xsDown>
              <Select
                label="Secondary color"
                labelId="select-secondary-color-label"
                value={theme.secondaryColor.id}
                onChange={handleSecondaryColorChange}
              >
                {Object.keys(colors).map((color) => {
                  color = colors[color];

                  return (
                    <MenuItem key={color.id} value={color.id}>
                      {color.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Hidden>
          </FormControl>
        </ListItem>
      </Box>

      {/* Dark mode */}
      <Box sx={{ my: 1, mr: 0 }}>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
          </Hidden>

          <ListItemText
            primary="Dark mode"
            secondary="Displays mostly dark surfaces"
          />

          <ListItemSecondaryAction>
            <Hidden xsDown>
              <Checkbox
                color="primary"
                checked={theme.dark}
                onChange={handleDarkModeChange}
              />
            </Hidden>

            <Hidden smUp>
              <Switch
                color="primary"
                checked={theme.dark}
                onChange={handleDarkModeChange}
              />
            </Hidden>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>

      <Box sx={{ mt: 2, mb: 1 }}>
        <Divider light />
      </Box>

      <Box sx={{ my: 1 }}>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <FormatColorResetIcon />
            </ListItemIcon>
          </Hidden>

          <ListItemText
            primary="Reset theme"
            secondary={
              isDefaultTheme(theme)
                ? 'No changes made'
                : 'Changes will be reset'
            }
          />

          <ListItemSecondaryAction>
            <Button
              color="secondary"
              /**
              TODO : DISABLED BUTTON
              Pass props from parent component `isLoading` or similar
             */
              disabled={isDefaultTheme(theme) || disabled}
              variant="contained"
              onClick={handleResetThemeClick}
            >
              Reset
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </List>
  );
}

export { AppearanceTab };
