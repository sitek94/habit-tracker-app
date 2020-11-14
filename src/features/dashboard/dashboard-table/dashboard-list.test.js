import { render, screen } from 'utils/test-utils';

import DashboardList from './dashboard-table';

const HABITS = [
  {
    id: '-MLshrHpHBKMxMHQwi8K',
    description: 'Did you read a book for an hour today?',
    frequency: {
      type: 'weekdays',
      value: [0, 1, 2, 3, 4, 5, 6],
    },
    name: 'Reading a book',
  },
  {
    id: '-MM1G29KuhzYMJeWxapP',
    description: 'Did you go to the gym?',
    frequency: {
      type: 'weekdays',
      value: [0, 2, 4],
    },
    name: 'Going to the gym',
  },
  {
    id: '-MM1GIAy7uVfvO-LKplV',
    description: 'Did you cook something?',
    frequency: {
      type: 'weekdays',
      value: [0, 1, 3, 4],
    },
    name: 'Cooking',
  },
];

jest.mock('../checkmark', () => () => <div>Checkmark</div>);

describe('<DashboardList />', () => {
   it('renders habits as dashboard list', () => {
    render(<DashboardList list={HABITS} />);

    expect(screen.getByText('Cooking')).toBeTruthy();
    expect(screen.getByText('Going to the gym')).toBeTruthy();
    expect(screen.getByText('Reading a book')).toBeTruthy();
  });
});
