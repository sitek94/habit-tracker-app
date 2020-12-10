import * as React from 'react';
import { DeleteForever as DeleteForeverIcon } from '@material-ui/icons';
import { useDeleteUserData } from 'api/user-data';
import { useAuth } from 'context/auth-context';
import { useDialog } from 'context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';
import { useTranslation } from 'translations';
import {
  Button,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

/**
 * Account Tab
 *
 * A tab where user can change account settings and delete the account.
 */
function AccountTab({ disabled }) {
  const { deleteAccount } = useAuth();
  const { openDialog } = useDialog();
  const { openSnackbar } = useSnackbar();
  const t = useTranslation();

  const deleteUserData = useDeleteUserData();

  const handleDeleteAccountClick = () => {
    openDialog({
      title: t('deleteAccountQuestion'),
      description: t('deleteAccountWarning'),
      confirmText: t('deleteAccount'),
      onConfirm: async () => {
        try {
          await deleteAccount();
          await deleteUserData();

          openSnackbar('success', t('accountDeleted'));
        } catch (error) {
          openSnackbar('error', error.message);
        }
      },
      color: 'secondary',
    });
  };

  return (
    <List disablePadding>
      <ListItem>
        <Hidden smDown>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
        </Hidden>

        <ListItemText
          primary={t('deleteAccount')}
          secondary={t('deleteAccountWarningShort')}
        />

        <ListItemSecondaryAction>
          <Button
            color="secondary"
            disabled={disabled}
            variant="contained"
            onClick={handleDeleteAccountClick}
          >
            {t('deleteAccountConfirmation')}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export { AccountTab };
