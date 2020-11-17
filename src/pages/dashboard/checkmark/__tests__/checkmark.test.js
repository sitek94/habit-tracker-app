import Checkmark from '../Checkmark';

import { render, screen, cleanup } from '@testing-library/react';

import { useCheckmarks } from 'hooks';
import { EMPTY } from 'data/constants';

jest.mock('hooks', () => ({
  useCheckmarks: jest.fn(),
}));

beforeEach(cleanup);

describe('<Checkmark />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the checkmark', () => {
    useCheckmarks.mockImplementation(() => ({
      habits: {
        'reading': {
          '2020-11-11': 1
        }
      },
      isLoading: false,
    }));

    render(<Checkmark habitId="reading" date="2020-11-11" />);

    expect(screen.getByTestId('checkmark')).toBeTruthy();
  });

  // it('handles error by displaying disabled button and tooltip', () => {
  //   useCheckmarks.mockImplementation(() => ({
  //     habits: {
  //       'reading': {
  //         '2020-11-11': 1
  //       }
  //     },
  //     isLoading: false,
  //   }));

  //   render(<Checkmark habitId="123" date="11-11-2020" />);

  //   expect(screen.getByTestId('checkmark-error')).toBeTruthy();
  //   expect(screen.getByTestId('tooltip')).toBeTruthy();
  // });
});
