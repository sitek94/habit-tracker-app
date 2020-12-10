import * as React from 'react';
import { locales, useLocale } from 'localization';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  SvgIcon,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useTranslation } from 'translations';

function LocaleSelect({ onLocaleClick = () => {} }) {
  const { code, setLocaleByCode } = useLocale();
  const t  = useTranslation();

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
    setLocaleByCode(clickedLocaleCode);
    closeMenu();
  };

  // Currently selected locale object
  const selectedLocale = locales.find((locale) => locale.code === code);

  return (
    <>
      <Tooltip title={t('selectLanguage')}>
        <IconButton
          color="inherit"
          aria-controls="select-language"
          aria-label={t('selectLanguage')}
          aria-haspopup="true"
          onClick={openMenu}
        >
          <SvgIcon>{selectedLocale.icon}</SvgIcon>
        </IconButton>
      </Tooltip>

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
