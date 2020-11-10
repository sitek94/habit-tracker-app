import { render, screen } from '@testing-library/react';

import AddHabitPage from './AddHabitPage';

it('renders without crashing', () => {
  render(<AddHabitPage />);

  expect(screen.getByText('Create a new habit')).toBeInTheDocument();
});
