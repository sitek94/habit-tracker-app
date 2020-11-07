import { Redirect, Route } from 'react-router-dom';

import { useFirebase } from 'features/firebase';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useFirebase();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
