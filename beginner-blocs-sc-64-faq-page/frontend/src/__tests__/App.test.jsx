import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';

import App from '../App';

import EthersContextProvider from '../contexts/ethers-provider-context';
import { theme } from '../theme/theme';

describe('Application', () => {
  it('renders main page appropriately', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <EthersContextProvider>
          <App />
        </EthersContextProvider>
      </ThemeProvider>,
      div
  );
  ReactDOM.unmountComponentAtNode(div);
  });
});


