import { Link } from 'react-router-dom';

import { Fab, Box } from '@material-ui/core';

import { Home as HomeIcon } from '@material-ui/icons';

import EmptyState from 'components/empty-state';

import { ReactComponent as HelloDarkness } from 'svgs/hello-darkness.svg';

const NotFoundPage = () => {
  return (
    <EmptyState
      image={<HelloDarkness />}
      title="Hello Darkness My Old Friend..."
      description="The page you’re trying to access doesn’t exist"
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

export default NotFoundPage;
