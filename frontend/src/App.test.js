import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ethers } from 'ethers';
import App from './App';

describe('Application', () => {
  it('renders main page appropriately', async () => {
    render(<App />);
    expect(await screen.queryByText('Hello Warld')).toBeInTheDocument();
  });
});
