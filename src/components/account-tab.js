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

// Translations
const translations = {
  dialogTitle: {
    pl: 'Usunąć konto?',
    es: 'Eliminar cuenta?',
    en: 'Delete account?',
  },
  dialogDescription: {
    pl: `Usuniętego konta nie można odzyskać. Wszystkie dane zostanę usunięte.`,
    es: `Esta acción eliminará permanentemente todos tus hábitos e datos. Esto no se puede deshacer.`,
    en: `Deleted accounts can't be recovered. All data associated with your account will be deleted.`,
  },
  dialogConfirmButton: {
    pl: 'Usuń konto',
    es: 'Eliminar cuenta',
    en: 'Delete account',
  },
  successMessage: {
    pl: 'Konto usunięte!',
    es: 'Cuenta eliminida!',
    en: 'Account deleted!',
  },
  listItemPrimary: {
    pl: 'Usuń konto',
    es: 'Eliminar cuenta',
    en: 'Delete account',
  },
  listItemSecondary: {
    pl: `Wszystkie dane zostanę usunięte.`,
    es: `Esto no se puede deshacer.`,
    en: `Accounts can't be recovered`,
  },
  listItemButton: {
    pl: 'Usuń',
    es: 'Eliminar',
    en: 'Delete',
  }
};

/**
 * Account Tab
 *
 * A tab where user can change account settings and delete the account.
 */
function AccountTab({ disabled }) {
  const { deleteAccount } = useAuth();
  const { openDialog } = useDialog();
  const { openSnackbar } = useSnackbar();
  const t = useTranslation(translations);

  const deleteUserData = useDeleteUserData();

  const handleDeleteAccountClick = () => {
    openDialog({
      title: t('dialogTitle'),
      description: t('dialogDescription'),
      confirmText: t('dialogConfirmButton'),
      onConfirm: async () => {
        try {
          await deleteAccount();
          await deleteUserData();

          openSnackbar('success', t('successMessage'));
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
          primary={t('listItemPrimary')}
          secondary={t('listItemSecondary')}
        />

        <ListItemSecondaryAction>
          <Button
            color="secondary"
            disabled={disabled}
            variant="contained"
            onClick={handleDeleteAccountClick}
          >
            {t('listItemButton')}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export { AccountTab };
