import { render } from '@testing-library/react';

import { DatesRangeProvider } from 'features/dates-range';

function AllTheProviders({ children }) {
  return <DatesRangeProvider>{children}</DatesRangeProvider>;
}

function customRender(ui, options) {
  render(ui, { wrapper: AllTheProviders, ...options });
}

// Reexport everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
