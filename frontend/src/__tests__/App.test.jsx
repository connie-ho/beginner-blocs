import { render} from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../App';
import { theme } from '../theme/theme';
import { ThemeProvider } from '@mui/material';

describe('Application', () => {
  it('renders main page appropriately', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>,
      div
  );
  ReactDOM.unmountComponentAtNode(div);
  });
});


