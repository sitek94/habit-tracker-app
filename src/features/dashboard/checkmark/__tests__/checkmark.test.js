import Checkmark from '../Checkmark';

import { render, screen, cleanup } from '@testing-library/react';

import { useCheckmarkValue } from 'hooks';

jest.mock('hooks', () => ({
  useCheckmarkValue: jest.fn(),
}));

beforeEach(cleanup);

describe('<Checkmark />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the checkmark', () => {
    useCheckmarkValue.mockImplementation(() => ({
      status: 'idle',
      error: null,
      value: 0,
    }));

    render(<Checkmark habitId="123" date="11-11-2020" />);

    expect(screen.getByTestId('checkmark-idle')).toBeTruthy();
  });

  it('handles error by displaying disabled button and tooltip', () => {
    useCheckmarkValue.mockImplementation(() => ({
      status: 'error',
      error: true,
      value: 0,
    }));

    render(<Checkmark habitId="123" date="11-11-2020" />);

    expect(screen.getByTestId('checkmark-error')).toBeTruthy();
    expect(screen.getByTestId('tooltip')).toBeTruthy();
  });
});
