import { render, screen } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

it('renders without crashing', () => {
  render(<NotFoundPage onAuthProviderClick={() => {}} />);

  expect(screen.getByText(`Page doesn’t exist`)).toBeInTheDocument();
});
