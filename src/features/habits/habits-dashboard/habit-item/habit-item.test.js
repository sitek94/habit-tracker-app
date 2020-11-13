import { render, screen } from '@testing-library/react';

import { DatesRangeProvider } from 'features/dates-range';
import HabitItem from './habit-item';

jest.mock('../checkmark', () => ({ date }) => <div>{date}</div>);

describe('Dashboard: <HabitItem />', () => {
  it('renders habit name', () => {
    render(
      <DatesRangeProvider>
        <table>
          <HabitItem id="123" name="Singing Little Talks" />
        </table>
      </DatesRangeProvider>
    );

    expect(screen.getByText('Singing Little Talks')).toBeTruthy();
  });
});
