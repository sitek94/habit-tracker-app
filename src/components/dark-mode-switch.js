import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, MenuItem, Tooltip, useTheme } from '@material-ui/core';
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@material-ui/icons';
import { useTranslation } from 'translations';

function DarkModeSwitch({ variant = 'icon', ...props }) {
  const t = useTranslation();
  const { palette, toggleDarkMode } = useTheme();

  const label = t('darkModeSwitch');

  const icon = palette.mode === 'light' ? <MoonIcon /> : <SunIcon />;

  if (variant === 'icon') {
    return (
      <Tooltip title={label}>
        <IconButton aria-label={label} onClick={toggleDarkMode} {...props}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  }

  if (variant === 'item') {
    return (
      <MenuItem onClick={toggleDarkMode} {...props}>
        <IconButton>{icon}</IconButton>
        <p>{t('darkModeSwitch')}</p>
      </MenuItem>
    );
  }
}

DarkModeSwitch.propTypes = {
  variant: PropTypes.oneOf(['icon', 'item']),
};

export { DarkModeSwitch };
