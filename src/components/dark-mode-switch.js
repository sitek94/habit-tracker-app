import React from 'react';
import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@material-ui/icons';
import { useTranslation } from 'translations';

function DarkModeSwitch(props) {
  const t = useTranslation();
  const { palette, toggleDarkMode } = useTheme();

  const label = t('darkModeSwitch');

  return (
    <Tooltip title={label}>
      <IconButton
        color="inherit"
        label={label}
        onClick={toggleDarkMode}
        {...props}
      >
        {palette.mode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Tooltip>
  );
}

export { DarkModeSwitch };
