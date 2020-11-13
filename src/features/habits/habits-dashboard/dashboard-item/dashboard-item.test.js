import { render, screen } from 'utils/test-utils';

import DashboardItem from './dashboard-item';

jest.mock('../checkmark', () => () => <div>Checkmark</div>);

describe('<DashboardItem />', () => {
  it('renders dashboard item', () => {
    render(
      <table>
        <DashboardItem habitId="123" habitName="Singing Little Talks" />
      </table>
    );

    expect(screen.getByText('Singing Little Talks')).toBeTruthy();
  });
});
