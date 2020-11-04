import { render, screen } from '@testing-library/react';

import ErrorPage from './Error';

it('renders without crashing', () => {
  render(<ErrorPage />);

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
