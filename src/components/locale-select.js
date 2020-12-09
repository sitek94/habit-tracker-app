import * as React from 'react';
import { locales } from 'locale';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  SvgIcon,
  Typography,
} from '@material-ui/core';

function LocaleSelect({ selectedLocale, onLocaleClick }) {
  // Open/close menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (clickedLocaleCode) => {
    onLocaleClick(clickedLocaleCode);
    closeMenu();
  };

  return (
    <>
      <Button
        disableElevation
        aria-controls="select-language"
        aria-haspopup="true"
        variant="contained"
        startIcon={<SvgIcon>{selectedLocale.icon}</SvgIcon>}
        onClick={openMenu}
      >
        {selectedLocale.label}
      </Button>

      <Menu
        id="select-language"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {locales.map(({ code, label, icon }) => (
          <MenuItem key={code} onClick={() => handleMenuItemClick(code)}>
            <ListItemIcon>
              <SvgIcon>{icon}</SvgIcon>
            </ListItemIcon>
            <Typography variant="inherit">{label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export { LocaleSelect };
