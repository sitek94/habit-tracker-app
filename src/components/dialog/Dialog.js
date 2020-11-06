import React from 'react';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function AlertDialog({
  open,
  onClose,
  contentText,
  title,
  actions,
}) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}
      {contentText && (
        <DialogContent>
          <DialogContentText id="dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>{actions}</DialogActions>
    </MuiDialog>
  );
}
