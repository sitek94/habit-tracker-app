import PropTypes from 'prop-types';

import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Snackbar = ({
  severity = 'info',
  open = false,
  onClose,
  message,
  autoHideDuration = 2000,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        elevation={6}
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  // Properties
  severity: PropTypes.oneOf(['info', 'error', 'success', 'warning']),
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,

  // Event handlers
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;
