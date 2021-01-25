import * as React from 'react';

import { useAuth } from 'context/auth-context';
import { UnathenticatedApp } from './unathenticated-app';
import { AuthenticatedAppProviders } from 'context';
import { AuthenticatedApp } from './authenticated-app';

function App() {
  const { user } = useAuth();

  return user ? (
    <AuthenticatedAppProviders>
      <AuthenticatedApp />
    </AuthenticatedAppProviders>
  ) : (
    <UnathenticatedApp />
  );
}

export { App };
