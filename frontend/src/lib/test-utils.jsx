import React from 'react';
import { ThemeProvider } from '@mui/material';
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { theme } from '../theme/theme';
import EthersContextProvider from '../contexts/ethers-provider-context';
import UserContextProvider from '../contexts/user-context';


const Providers = ({children}) => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <EthersContextProvider>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </EthersContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options });

const customRenderHook = (callback) =>
  renderHook(callback, { wrapper: Providers });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as renderWithProviders, customRenderHook as renderHookWithProviders, Providers as TestProviders };