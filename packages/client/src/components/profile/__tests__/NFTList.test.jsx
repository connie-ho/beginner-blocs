import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';
import NFTList from '../NFTList';
import { createTestNft } from '../../../lib/test/helper/nft';

describe('NFTList', () => {
  const renderNFTList = async (props) => {
    const view = renderWithProviders(<NFTList {...props} />);

    return {
      ...view,
      $findNFTItems: async () => screen.findAllByTestId(/^nft-item-/),
    };
  };

  const nft1 = createTestNft();
  const nft2 = createTestNft({ tokenId: 2 });
  const nfts = [nft1, nft2];

  const mockProps = { items: nfts, type: 'owned' };

  test('it renders', async () => {
    const { container } = await renderNFTList(mockProps);
    expect(container).toBeVisible();
  });

  test('should display a list of nfts items', async () => {
    const { $findNFTItems } = await renderNFTList(mockProps);
    const NFTItems = await $findNFTItems();
    expect(NFTItems).toHaveLength(2);
  });

  test('should display a message if no items are found', async () => {
    await renderNFTList({ items: [], type: 'owned' });
    expect(screen.getByText('No Items Found!')).toBeInTheDocument();
  });
});
