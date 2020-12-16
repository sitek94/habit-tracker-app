import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

const MobileMenuContext = React.createContext();

/**
 * Provides a functionality for mobile menu.
 */
function MobileMenuProvider({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const onMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const context = {
    anchorEl,
    isMenuOpen,
    onMenuClick,
    onClose,
  };

  return (
    <MobileMenuContext.Provider value={context}>
      {children}
    </MobileMenuContext.Provider>
  );
}

/**
 * Convienient access to `MobileMenuContext`.
 */
function useMobileMenu() {
  const context = React.useContext(MobileMenuContext);

  if (context === undefined) {
    throw new Error('useMobileMenu must be used within MobileMenuProvider');
  }

  return context;
}

/**
 * Mobile menu wrapper
 */
function MobileMenu({ children }) {
  const { anchorEl, isMenuOpen, onClose } = useMobileMenu();

  return (
    <Menu
      anchorEl={anchorEl}
      id="mobile-menu"
      keepMounted
      open={isMenuOpen}
      onClose={onClose}
    >
      {children}
    </Menu>
  );
}

/**
 * Mobile menu item
 */
const MobileMenuItem = React.forwardRef(function MobileMenuItem(props, ref) {
  const { children, ...other } = props;

  const { onClose } = useMobileMenu();

  return (
    <MenuItem
      onClick={onClose}
      ref={ref}
      {...other}
    >
      {children}
    </MenuItem>
  );
});

/**
 * Toggles `<MobileMenu>` visibility.
 *
 * Is hidden on screens above `xs`
 */
function MobileMenuToggler() {
  const { onMenuClick } = useMobileMenu();

  return (
    <IconButton
      aria-label="show more"
      aria-controls="mobile-menu"
      aria-haspopup="true"
      onClick={onMenuClick}
      color="inherit"
    >
      <MoreVertIcon />
    </IconButton>
  );
}

export { MobileMenuProvider, MobileMenu, MobileMenuItem, MobileMenuToggler };
