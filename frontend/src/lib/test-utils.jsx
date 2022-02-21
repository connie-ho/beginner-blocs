import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import Providers from "../Providers";

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options });

const customRenderHook = (callback) =>
  renderHook(callback, { wrapper: Providers });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as renderWithProviders, customRenderHook as renderHookWithProviders, Providers as TestProviders };