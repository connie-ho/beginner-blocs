import React from 'react';
import { cleanup, render } from '@testing-library/react';
import RequireAuth from '../RequireAuth';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@mui/material';
import { Router } from 'react-router-dom';
import EthersContextProvider from '../contexts/ethers-provider-context';
import UserContextProvider from '../contexts/user-context';
import theme from '../theme/theme';

afterEach(cleanup);

function renderWithRouter(ui, { route = '/404', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(
      <Router location={history.location} navigator={history}>
        {ui}
      </Router>
    ),
    history,
  };
}

describe('RequireAuth', () => {
  const requireAuth = async () => {
    const view = renderWithRouter(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <EthersContextProvider>
            <UserContextProvider>
              <RequireAuth />
            </UserContextProvider>
          </EthersContextProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
    return {
      ...view,
    };
  };

  test('it renders without crashing', async () => {
    const { container } = await requireAuth();
    expect(container).toBeVisible();
  });
});
