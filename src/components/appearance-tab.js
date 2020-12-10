import * as React from 'react';
import { isDefaultTheme, colors } from 'theme';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
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
  useMediaQuery,
} from '@material-ui/core';
import {
  FiberManualRecord as FiberManualRecordIcon,
  Brightness4 as Brightness4Icon,
  FormatColorReset as FormatColorResetIcon,
} from '@material-ui/icons';
import { useUpdateTheme, useRemoveTheme } from 'api/appearance';
import { useTranslation } from 'translations';

/**
 * Appearance Tab
 *
 * A tab where user can change appearance settings of the app.
 */
function AppearanceTab({ disabled }) {
  const theme = useTheme();
  const t = useTranslation();

  const updateTheme = useUpdateTheme();
  const resetTheme = useRemoveTheme();

  // Change primary color
  const handlePrimaryColorChange = (event) => {
    if (!event) return;

    const primaryColor = event.target.value;

    if (!primaryColor) return;
    if (theme.primaryColor.id === primaryColor) return;

    updateTheme({
      primaryColor,
      secondaryColor: theme.secondaryColor.id,
      dark: theme.dark,
    });
  };

  // Change secondary color
  const handleSecondaryColorChange = (event) => {
    if (!event) return;

    const secondaryColor = event.target.value;

    if (!secondaryColor) return;
    if (theme.secondaryColor.id === secondaryColor) return;

    updateTheme({
      primaryColor: theme.primaryColor.id,
      secondaryColor,
      dark: theme.dark,
    });
  };

  // Change dark mode
  const handleDarkModeChange = (event) => {
    if (!event) return;

    const dark = event.target.checked;

    if (theme.dark === dark) return;

    updateTheme({
      primaryColor: theme.primaryColor.id,
      secondaryColor: theme.secondaryColor.id,
      dark: dark,
    });
  };

  // Reset theme to default
  const handleResetThemeClick = () => {
    if (isDefaultTheme(theme)) return;

    resetTheme();
  };

  // Media queries
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <List disablePadding>
      {/* Primary color */}
      <Box sx={{ my: 1 }}>
        <ListItem>
          {!isXs && (
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
          )}

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-primary-color-label">
              {t('primaryColor')}
            </InputLabel>

            {/* Mobile devices */}
            {isXs && (
              <Select
                native
                label={t('primaryColor')}
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
            )}

            {/* Up mobile devices */}
            {!isXs && (
              <Select
                label={t('primaryColor')}
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
            )}
          </FormControl>
        </ListItem>
      </Box>

      {/* Secondary color */}
      <Box sx={{ my: 1 }}>
        <ListItem>
          {!isXs && (
            <ListItemIcon>
              <FiberManualRecordIcon color="secondary" />
            </ListItemIcon>
          )}

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-secondary-color-label">
            {t('secondaryColor')}
            </InputLabel>

            {/* Mobile devices */}
            {isXs && (
              <Select
                native
                label={t('secondaryColor')}
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
            )}

            {/* Up mobile devices */}
            {!isXs && (
              <Select
                label={t('secondaryColor')}
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
            )}
          </FormControl>
        </ListItem>
      </Box>

      {/* Dark mode */}
      <Box sx={{ my: 1, mr: 0 }}>
        <ListItem>
          {!isXs && (
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
          )}

          <ListItemText
            primary={t('darkMode')}
            secondary={t('darkModeDescription')}
          />

          <ListItemSecondaryAction>
            {!isXs && (
              <Checkbox
                color="primary"
                checked={theme.dark}
                onChange={handleDarkModeChange}
              />
            )}

            {isXs && (
              <Switch
                color="primary"
                checked={theme.dark}
                onChange={handleDarkModeChange}
              />
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </Box>

      <Box sx={{ mt: 2, mb: 1 }}>
        <Divider light />
      </Box>

      <Box sx={{ my: 1 }}>
        <ListItem>
          {!isXs && (
            <ListItemIcon>
              <FormatColorResetIcon />
            </ListItemIcon>
          )}

          <ListItemText
            primary={t('resetTheme')}
            secondary={
              isDefaultTheme(theme)
                ? t('resetThemeNoChanges')
                : t('resetThemeDescription')
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
              {t('resetThemeButton')}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </List>
  );
}

export { AppearanceTab };
