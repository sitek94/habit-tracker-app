import PropTypes from 'prop-types';

import { LinearProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ shape }) => ({
  buttonProgress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: shape.borderRadius,
    opacity: props => props.opacity,
  },
}));

const ButtonProgress = ({ opacity = 0.5, ...rest }) => {
  const classes = useStyles({ opacity });

  return <LinearProgress className={classes.buttonProgress} {...rest} />;
};

ButtonProgress.propTypes = {
  opacity: PropTypes.number
}

export default ButtonProgress;

