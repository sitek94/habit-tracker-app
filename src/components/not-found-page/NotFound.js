import { Link, useLocation } from 'react-router-dom';

import { Fab, Box } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

import EmptyState from 'components/empty-state';

import { ReactComponent as HelloDarkness } from 'svgs/hello-darkness.svg';

const NotFoundPage = () => {
  let title = 'Hello Darkness My Old Friend...';
  let description = 'The page you’re trying to access doesn’t exist';

  const { state } = useLocation();

  if (state) {
    title = state.title;
    description = state.description;
  }

  return (
    <EmptyState
      image={<HelloDarkness />}
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

export default NotFoundPage;
