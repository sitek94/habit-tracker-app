import { Link as RouterLink } from 'react-router-dom';
import { Fab, Box, Typography } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { ReactComponent as HelloDarkness } from 'images/hello-darkness.svg';
import { useTranslation } from 'translations';

/**
 * Not Found Screen
 * 
 * This screen is displayed when the user tries to go the page that doesn't exist.
 * 
 * There is a big button that takes the user back to the 'Dashboard Screen'.
 */
function NotFoundScreen() {
  const t = useTranslation();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        clone
        sx={{
          width: '50%',
          height: '50%',
          margin: 2,
        }}
      >
        <HelloDarkness />
      </Box>

      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography variant="h4">{t('notFoundMessage')}</Typography>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        component={RouterLink}
        to="/dashboard"
      >
        <Box
          clone
          sx={{
            mr: 1,
          }}
        >
          <HomeIcon />
        </Box>
        {t('goBack')}
      </Fab>
    </Box>
  );
}

export { NotFoundScreen };
