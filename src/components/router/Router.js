import PropTypes from 'prop-types';

import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';

import NotFoundPage from 'pages/not-found-page';
import LoginPage from 'pages/login-page';
import SignUpPage from 'pages/sign-up-page';

import { useContext } from 'react';
import { FirebaseContext } from 'api/firebase-context';

const Router = ({ navbar }) => {
  return (
    <BrowserRouter>
      {navbar}

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Switch>

        <Route exact path="/">
          <PublicPage />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/signup">
          <SignUpPage />
        </Route>

        <PrivateRoute exact path="/protected">
          <ProtectedPage />
        </PrivateRoute>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  user: PropTypes.object,
};

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function AuthButton() {
  let history = useHistory();
  const { user, auth } = useContext(FirebaseContext);

  return user ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          auth.signOut();
          history.push('/');
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(FirebaseContext);
  console.log(user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Login() {
  let history = useHistory();
  let location = useLocation();
  const { auth } = useContext(FirebaseContext);

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {

    auth.signInWithEmailAndPassword('janek@poczta.pl', 'cukierki').then(() => {
      history.replace(from);
      
    })
    .catch(console.log);
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Router;
