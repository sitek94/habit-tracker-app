import PropTypes from 'prop-types';
import { CssBaseline, makeStyles } from '@material-ui/core';

// Styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

export function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
