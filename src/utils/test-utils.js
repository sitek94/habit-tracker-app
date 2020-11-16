import { render } from '@testing-library/react';

function AllTheProviders({ children }) {
  return children;
}

function customRender(ui, options) {
  render(ui, { wrapper: AllTheProviders, ...options });
}

// Reexport everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
