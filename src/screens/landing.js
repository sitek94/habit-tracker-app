import { Fab, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import landscape from 'images/landscape.jpg';

const useStyles = makeStyles(theme => ({
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

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.image}>
      <div className={classes.textBox}>
        <Typography variant="h2" component="h1">
          Achieve anything
        </Typography>

        <Typography variant="h3" gutterBottom>
          one step at a time
        </Typography>
        
        <Fab
          to="/signup"
          component={RouterLink}
          aria-label="Get started"
          color="primary"
          variant="extended"
        >
          Get Started
        </Fab>
      </div>
    </div>
  );
}

export default LandingPage;

