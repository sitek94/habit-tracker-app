import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Fab, Box } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { ReactComponent as BugFixing } from 'svgs/bug-fixing.svg';

import EmptyState from 'components/empty-state';

const ErrorPage = ({ title, description }) => {
  return (
    <EmptyState
      image={<BugFixing />}
      title={title}
      description={description}
      button={
        <Fab variant="extended" color="primary" component={Link} to="/">
          <Box clone mr={1}>
            <HomeIcon />
          </Box>
          Home
        </Fab>
      }
    />
  );
};

ErrorPage.defaultProps = {
  title: 'Something went wrong',
  description: `There has been a problem and we couldn't load the page`,
}

ErrorPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default ErrorPage;
