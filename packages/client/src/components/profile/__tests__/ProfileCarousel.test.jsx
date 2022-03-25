import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../lib/test-utils';

import { createTestNft } from '../../../lib/test/helper/nft';
import ProfileCarousel from '../ProfileCarousel';

describe('ProfileCarousel', () => {
  const nft1 = createTestNft();
  const nft2 = createTestNft({ tokenId: 2 });
  const nfts = [nft1, nft2];

  const mockProps = { nfts: nfts };

  const renderProfileCarousel = async (props) => {
    const view = renderWithProviders(<ProfileCarousel {...props} />);

    return {
      ...view,
      $findCarouselItems: async () => screen.findAllByTestId(/^carousel-item/),
    };
  };

  test('it renders correctly', async () => {
    const { container } = await renderProfileCarousel(mockProps);
    expect(container).toBeVisible();
  });

  test('should show nothing if no valid NFTs are found', async () => {
    const nft1 = createTestNft({ description: 'N/A', name: 'N/A' });
    const noValidNFTS = {
      nfts: [nft1],
    };

    const { container } = await renderProfileCarousel(noValidNFTS);
    expect(container).toBeEmptyDOMElement();
  });
});
