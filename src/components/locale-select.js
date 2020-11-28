import * as React from 'react';
import { useLocale, locales } from 'locale';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  SvgIcon,
  Typography,
} from '@material-ui/core';

function LocaleSelect() {

  // Open/close menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  
  const { code: selectedLocaleCode, changeLocale } = useLocale();

  const handleMenuItemClick = (clickedLocaleCode) => {
    // Find clicked locale by its code
    const clickedLocale = locales.find(locale => locale.code === clickedLocaleCode);

    // Check if user is not clicking on the selected locale
    if (clickedLocale.code !== selectedLocaleCode) {
      changeLocale(clickedLocale.import);
    }
    closeMenu();
  } 

  const selectedLocale = locales.find(locale => locale.code === selectedLocaleCode);
  
  return (
    <>
      <Button
        disableElevation
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        startIcon={<SvgIcon>{selectedLocale.icon}</SvgIcon>}
        onClick={openMenu}
      >
        {selectedLocale.label}
      </Button>

      <Menu
        id="simple-menu"
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
