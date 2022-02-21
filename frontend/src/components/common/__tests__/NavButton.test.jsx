import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';

import NavButton from '../NavButton';

afterEach(cleanup);

it('renders without crashing', () => {
  render(<NavButton />);
});

it('renders a login button', () => {
  render(<NavButton>Login</NavButton>);
  expect(screen.getByText('Login')).toBeInTheDocument();
});

it('renders a logout button', () => {
  render(<NavButton>Logout</NavButton>);
  expect(screen.getByText('Logout')).toBeInTheDocument();
});

it('renders a clickable button', async () => {
  const handleClick = jest.fn();
  render(<NavButton onClick={handleClick}>Clickable</NavButton>);

  const button = screen.getByText('Clickable');

  fireEvent.click(button);

  await waitFor(() => {
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
