import PropTypes from 'prop-types';

import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Snackbar = ({ severity = 'info', open = false, onClose, message }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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

  // Event handlers
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;
