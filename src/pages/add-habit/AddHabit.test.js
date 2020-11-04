import { render, screen } from '@testing-library/react';

import AddHabitPage from './AddHabit';

it('renders without crashing', () => {
  render(<AddHabitPage />);

  expect(screen.getByText('Create a new habit')).toBeInTheDocument();
});
