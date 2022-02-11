import React from 'react';
import ReactDOM from 'react-dom';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';

import App from './App';
import EthersContextProvider from './contexts/ethers-provider-context';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <EthersContextProvider>
        <App />
      </EthersContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
