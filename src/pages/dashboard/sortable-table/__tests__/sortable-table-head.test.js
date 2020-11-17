import { render, screen, fireEvent, cleanup } from 'utils/test-utils';

import SortableTableHead from '../sortable-table-head';

beforeEach(cleanup);

// function customRender(ui) {
//   render(<table>{ui}</table>);
// }

describe('<SortableTableHead />', () => {
  it('renders table head when order is asc', () => {
    render(
      <SortableTableHead order="asc" orderBy="name" onRequestSort={() => {}} />
    );

    expect(screen.getByText(/Habit name/)).toBeTruthy();
  });

  it('renders table head when order is desc', () => {
    render(
      <SortableTableHead order="desc" orderBy="name" onRequestSort={() => {}} />
    );

    expect(screen.getByText(/Habit name/)).toBeTruthy();
  });

  it('renders and accepts onClick event', () => {
    const handleRequestSort = jest.fn();

    render(
      <SortableTableHead
        order="asc"
        orderBy="name"
        onRequestSort={handleRequestSort}
      />
    );

    fireEvent.click(screen.getByTestId('position'));

    expect(handleRequestSort).toHaveBeenCalled();
  });
});
