import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { ThemeProvider } from '@mui/material';

import EthersContextProvider from '../contexts/ethers-provider-context';
import UserContextProvider from '../contexts/user-context';
import { theme } from '../theme/theme';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', async () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index.jsx');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <EthersContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </EthersContextProvider>
        </ThemeProvider>
      </React.StrictMode>,
      div
    );
  });
});
