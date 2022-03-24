import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../lib/test-utils';

import Home from '../Home';

describe('Home', () => {
  const renderHome = async (props) => {
    const view = renderWithProviders(<Home {...props} />);

    return {
      ...view,
      getStartedButton: screen.queryByRole('button', { name: /get started/i }),
      $findMarketList: async () => screen.findByTestId('market-list'),
    };
  };

  test('it renders', async () => {
    const { container } = await renderHome();
    expect(container).toBeVisible();
  });

  test('should have all the appropriate components', async () => {
    const { getStartedButton, $findMarketList } = await renderHome();

    expect(await $findMarketList()).toBeVisible();
    expect(getStartedButton).toBeVisible();
  });

  test('should redirect the user when the get started button is clicked', async () => {
    const { getStartedButton } = await renderHome();

    userEvent.click(getStartedButton);
    expect(getStartedButton).toHaveAttribute('href', '/get-started');
  });
});
