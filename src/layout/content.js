import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  padding: {
    padding: theme.spacing(2),
  },
}));

// Layout
export function Content({ children }) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </main>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

