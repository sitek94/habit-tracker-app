import { render, screen } from '@testing-library/react';

import AuthProviderList from './AuthProviderList';
import authProviders from 'data/auth-providers';

it('renders without crashing', () => {
  render(<AuthProviderList onAuthProviderClick={() => {}} />)

  for (let authProvider of authProviders) {
    expect(screen.getByText(authProvider.name)).toBeInTheDocument();
  }
});
