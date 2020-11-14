import { render, screen, fireEvent, cleanup } from 'utils/test-utils';

import SortableTable from '../sortable-table';

const HABITS = [
  {
    id: '-MLshrHpHBKMxMHQwi8K',
    name: 'Reading a book',
    description: 'Did you read a book for an hour today?',
    frequency: {
      type: 'weekdays',
      value: [0, 1, 2, 3, 4, 5, 6],
    },
  },
  {
    id: '-MM1G29KuhzYMJeWxapP',
    name: 'Going to the gym',
    description: 'Did you go to the gym?',
    frequency: {
      type: 'weekdays',
      value: [0, 2, 4],
    },
  },
  {
    id: '-MM1GIAy7uVfvO-LKplV',
    name: 'Cooking',
    description: 'Did you cook something?',
    frequency: {
      type: 'weekdays',
      value: [0, 1, 3, 4],
    },
  },
];

const DATES = [
  "2020-11-10",
  "2020-11-11",
  "2020-11-12",
  "2020-11-13",
  "2020-11-14",
  "2020-11-15",
  "2020-11-16",
]

jest.mock('../../checkmark', () => () => <div>Checkmark</div>);

beforeEach(cleanup);

describe('<SortableTable />', () => {
  
  it('renders the table', () => {
    render(<SortableTable rows={HABITS} dates={DATES} />);

    expect(screen.getByTestId('table')).toBeTruthy();
  })
  
  it('renders the table and rows', () => {
    render(<SortableTable rows={HABITS} dates={DATES} />);

    expect(screen.getByText(/Cooking/)).toBeTruthy();
    expect(screen.getByText(/Going to the gym/)).toBeTruthy();
    expect(screen.getByText(/Reading a book/)).toBeTruthy();
  });

  it('changes sorting to ascending by name after clicking on `name` cell in table head', () => {
    render(<SortableTable rows={HABITS} dates={DATES} />);

    fireEvent.click(screen.getByTestId('name'));

    expect(screen.getByTestId('sorted-asc-by-name')).toBeTruthy();
  });

  it('changes sorting to descending by position after clicking twice on `position` cell in table head', () => {
    render(<SortableTable rows={HABITS} dates={DATES} />);

    fireEvent.click(screen.getByTestId('position'));
    fireEvent.click(screen.getByTestId('position'));

    expect(screen.getByTestId('sorted-desc-by-position')).toBeTruthy();
  });
});

