import { render, screen } from '@testing-library/react';

import Snackbar from './Snackbar';

it('renders without crashing', () => {
  render(<Snackbar message="Just a test" onClose={() => {}} />);

  expect(screen.getByText('Just a test')).toBeInTheDocument();
});
