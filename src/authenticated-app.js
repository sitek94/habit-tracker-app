import { useAuth } from 'context/auth-context';
import * as React from 'react'

function AuthenticatedApp() {

  const { signOut } = useAuth();

  return (
    <div>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}

export default AuthenticatedApp;