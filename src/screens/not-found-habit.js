import { Link as RouterLink } from 'react-router-dom';
import { Fab, Box, Typography } from '@material-ui/core';
import { List as ListIcon } from '@material-ui/icons';
import { ReactComponent as TowingSvg } from 'images/towing.svg';
import { useTranslation } from 'translations';

/**
 * Not Found Habit Screen
 *
 * This screen is displayed when the user tries to manually go to the
 * habit route that doesn't exist.
 *
 * There is a big button that navigates the user back to the 'Dashboard Screen'
 */
function NotFoundHabitScreen() {
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
          height: '30%',
          margin: 2,
        }}
      >
        <TowingSvg />
      </Box>

      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography variant="h4">{t('habitNotFound')}</Typography>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        component={RouterLink}
        to="/manage-habits"
      >
        <Box
          clone
          sx={{
            mr: 1,
          }}
        >
          <ListIcon />
        </Box>
        {t('habitList')}
      </Fab>
    </Box>
  );
}

export { NotFoundHabitScreen };
