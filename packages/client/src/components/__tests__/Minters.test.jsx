// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import Minter from '../Minters';

import { renderWithProviders } from '../../lib/test-utils';

describe('Minters', () => {
  const renderMinters = async (props) => {
    const view = renderWithProviders(<Minter {...props} />);

    return {
      ...view,
      // getStartedButton: screen.queryByRole('button', {name: /get started/i}),
      chooseFileButton: screen.queryByRole('button', { name: /Choose File/i }),
      mintNFTButton: screen.queryByRole('button', { name: /Mint NFT/i }),
    };
  };
  test('it renders', async () => {
    const { container } = await renderMinters();
    expect(container).toBeVisible();
  });
  // test('should have all the appropriate components', async () => {
  //     const { getStartedButton, $findMarketList } = await renderHome()
  //     expect(await $findMarketList()).toBeVisible()
  //     expect(getStartedButton).toBeVisible()
  // })
  // test('should redirect the user when the get started button is clicked', async () => {
  //     const { getStartedButton } = await renderHome()
  //     userEvent.click(getStartedButton)
  //     expect(getStartedButton).toHaveAttribute('href', '/get-started');
  // })
});
