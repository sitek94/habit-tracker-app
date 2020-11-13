import Checkmark from '../Checkmark';

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useCheckmarkValue } from '../hooks';

// import { useFirebase } from 'services/firebase';

// jest.mock('services/firebase', () => ({
//   useFirebase: () => ({
//     db: {
//       ref: jest.fn(() => ({
//         // Getting value from database
//         once: jest.fn(() =>
//           Promise.resolve({
//             val: jest.fn(() => 0),
//             exists: jest.fn(() => true)
//           })
//         ),
//       })),w
//     }
//   })
// }));

// jest.mock('../hooks', () => ({
//   useCheckmarkValue: () => ({
  //     status: 'idle',
  //     value: 1,
  //     error: null,
  //   })
  // }))
  
jest.mock('../hooks', () => ({
  useCheckmarkValue: jest.fn(),
}))

beforeEach(cleanup); // Clean the DOM

describe('<Checkmark />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the checkmark',  () => {
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
  
  // it('renders the checkmark and accepts onClick', () => {
  //   const handleClick = jest.fn();
  //   const spy = jest.spyOn(console, 'log');

  //   useCheckmarkValue.mockImplementation(() => ({
  //     status: 'idle',
  //     error: null,
  //     value: 0,
  //     updateValue: handleClick,
  //   }));
    
  //   const { debug } = render(<Checkmark habitId="123" date="11-11-2020" />);
  //   debug();

  //   expect(screen.queryByTestId('checkmark-idle')).toBeTruthy();
    
  //   fireEvent.click(screen.queryByTestId('checkmark-idle'));

  //   expect(spy).toHaveBeenCalled();
  // })
})

