import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithProviders } from '../lib/test-utils';
import * as useGetNFTs from '../hooks/use-get-nfts';
import { createTestNft } from '../lib/test/helper/nft';
import Profile from '../components/Profile';

afterEach(cleanup);

describe('Profile', () => {
  const renderProfile = async (props) => {
    const view = renderWithProviders(<Profile {...props} />);
    return {
      ...view,
    };
  };

  test('it renders without crashing', async () => {
    const nft1 = await createTestNft();
    const nft2 = await createTestNft({ tokenId: 2 });
    const nft3 = await createTestNft({ tokenId: 3 });
    const nft4 = await createTestNft({ tokenId: 4 });
    const listedNFTs = [nft1, nft2];
    const ownedNFTs = [nft3, nft4];

    const mockLoadListedNFTs = jest.fn().mockResolvedValue(listedNFTs);
    const mockLoadOwnedNFTs = jest.fn().mockResolvedValue(ownedNFTs);

    jest.spyOn(useGetNFTs, 'useGetNFTs').mockReturnValue({
      loadListedNFTs: mockLoadListedNFTs,
      loadOwnedNFTs: mockLoadOwnedNFTs,
    });

    const { container } = await renderProfile();
    expect(container).toBeVisible();
  });
});
