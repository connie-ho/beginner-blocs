import { render } from "@testing-library/react";

import Providers from '../Providers';

const renderWithProviders = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });

export { renderWithProviders };