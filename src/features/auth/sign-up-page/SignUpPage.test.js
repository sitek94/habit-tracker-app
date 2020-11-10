import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';
import { FirebaseProvider } from 'firebase';

it('renders without crashing', () => {
  render(
    <FirebaseProvider>
      <SignUpPage />
    </FirebaseProvider>
  );

  expect(screen.getByText('Sign up for an account')).toBeInTheDocument();
});
