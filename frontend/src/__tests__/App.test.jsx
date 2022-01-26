import { render} from '@testing-library/react';
import App from '../App';

describe('Application', () => {
  it('renders main page appropriately', async () => {
    render(<App />);
  });
});


