import React from 'react';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';

import EthersContextProvider from './contexts/ethers-provider-context';
import UserContextProvider from './contexts/user-context';


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

export default Providers;