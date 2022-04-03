import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';

import NotFound from '../NotFound';

describe('404 page', () => {
  test('it renders 404 page with link to Home', async () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('href', '/');
  });
});
