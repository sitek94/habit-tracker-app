import { Fab, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import landscape from 'images/landscape.jpg';
import { useTranslation } from 'translations';

const useStyles = makeStyles((theme) => ({
  image: {
    height: '100vh',
    alignSelf: 'stretch',
    backgroundImage: `url(${landscape})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  textBox: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: theme.palette.common.white,
    textAlign: 'center',
  },
}));

function LandingScreen() {
  const classes = useStyles();
  const t = useTranslation();

  return (
    <div className={classes.image}>
      <div className={classes.textBox}>
        <Typography variant="h2" component="h1">
          {t('landingMainText')}
        </Typography>

        <Typography variant="h3" gutterBottom>
          {t('landingSecondaryText')}
        </Typography>

        <Fab
          to="/signup"
          component={RouterLink}
          aria-label={t('getStarted')}
          color="primary"
          variant="extended"
        >
          {t('getStarted')}
        </Fab>
      </div>
    </div>
  );
}

export { LandingScreen };
