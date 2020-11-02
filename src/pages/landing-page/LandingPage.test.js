import { render, screen } from '@testing-library/react';

import LadingPage from './LadingPage';

it('renders without crashing', () => {
  render(<LadingPage />);

  expect(screen.getByText('Habit Tracker App')).toBeInTheDocument();
});
