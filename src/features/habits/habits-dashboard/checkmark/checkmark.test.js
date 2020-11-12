import Checkmark from './Checkmark';

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import { useFirebase } from 'services/firebase';

beforeEach(cleanup); // Clean the DOM

jest.mock('services/firebase', () => ({
  useFirebase: () => ({
    db: {
      ref: jest.fn(() => ({
        // Getting value from database
        once: jest.fn(() =>
          Promise.resolve({
            val: jest.fn(() => 0),
            exists: jest.fn(() => true)
          })
        ),
      })),
    },
  }),
}));

describe('<Checkmark />', () => {
  it('renders', async () => {
    await act(async () => render(<Checkmark date="11-11-2020" habitId="123" />))

    
    expect(screen.getByTestId('checkmark-action')).toBeTruthy();
    
  })
})

