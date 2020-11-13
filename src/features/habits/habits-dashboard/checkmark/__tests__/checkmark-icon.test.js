import { render, screen, cleanup } from '@testing-library/react';

import CheckmarkIcon from '../checkmark-icon';

import { COMPLETED, SKIPPED, FAILED } from 'data/constants';

beforeEach(cleanup)

describe('<CheckmarkIcon />', () => {
  it('renders empty checkmark icon', () => {
    render(<CheckmarkIcon />);

    expect(screen.getByTestId('checkmark-empty')).toBeTruthy();
  });

  it('renders completed checkmark icon', () => {
    render(<CheckmarkIcon value={COMPLETED} />);

    expect(screen.getByTestId('checkmark-completed')).toBeTruthy();
  });

  it('renders skipped checkmark icon', () => {
    render(<CheckmarkIcon value={SKIPPED} />);

    expect(screen.getByTestId('checkmark-skipped')).toBeTruthy();
  });

  it('renders failed checkmark icon', () => {
    render(<CheckmarkIcon value={FAILED} />);

    expect(screen.getByTestId('checkmark-failed')).toBeTruthy();
  });
});
