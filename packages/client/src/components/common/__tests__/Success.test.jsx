import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';

import Success from '../Success';

describe('Success page', () => {
  test('it renders success page with given message', async () => {
    renderWithProviders(<Success successMsg="A message" />);

    expect(screen.getByText('A message')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('href', '/profile');
  });
});
