import { renderHook, act } from '@testing-library/react-hooks';

import { useGetNFTs } from '../use-get-nfts';
import * as dataUtils from '../../lib/test/data-utils/axios';

const marketContract = {
  fetchMarketItems: jest.fn(),
  fetchMyListedNFTs: jest.fn(),
  loadOwnedNFTs: jest.fn(),
  fetchUserListedNFTs: jest.fn(),
};

const nft = [
  { nftContract: 'test', tokenId: '1', price: '1', itemId: '101', seller: 'test-seller', owner: 'test-owner' },
];

describe('useGetNFTs', () => {
  afterEach(jest.clearAllMocks);

  describe('loadMarketNFTs', () => {
    test(`it should return marketNFTs`, async () => {
      jest.spyOn(marketContract, 'fetchMarketItems').mockResolvedValue(nft);
      jest
        .spyOn(dataUtils, 'getMetaData')
        .mockResolvedValue({ image: 'ipfs://test-image', description: 'test-description', name: 'test-name' });

      const { result } = renderHook(() => useGetNFTs({ marketContract }));
      await act(async () => {
        const res = await result.current.loadMarketNFTs();
        expect(res[0].price).toBe('0.000000000000000001');
        expect(res[0].itemId).toBe(101);
        expect(res[0].image).toBe('https://ipfs.io/test-image');
      });
    });
  });

  describe('loadListedNFTs', () => {
    test(`it should return marketNFTs`, async () => {
      jest.spyOn(marketContract, 'fetchMyListedNFTs').mockResolvedValue(nft);
      jest
        .spyOn(dataUtils, 'getMetaData')
        .mockResolvedValue({ image: 'ipfs://test-image', description: 'test-description', name: 'test-name' });

      const { result } = renderHook(() => useGetNFTs({ marketContract }));
      await act(async () => {
        const res = await result.current.loadListedNFTs();
        expect(res[0].price).toBe('0.000000000000000001');
        expect(res[0].itemId).toBe(101);
        expect(res[0].image).toBe('https://ipfs.io/test-image');
      });
    });
  });

  describe('loadUserListedNFTs', () => {
    test(`it should return marketNFTs`, async () => {
      jest.spyOn(marketContract, 'fetchUserListedNFTs').mockResolvedValue(nft);
      jest
        .spyOn(dataUtils, 'getMetaData')
        .mockResolvedValue({ image: 'ipfs://test-image', description: 'test-description', name: 'test-name' });

      const { result } = renderHook(() => useGetNFTs({ marketContract }));
      await act(async () => {
        const res = await result.current.loadUserListedNFTs();
        expect(res[0].price).toBe('0.000000000000000001');
        expect(res[0].itemId).toBe(101);
        expect(res[0].image).toBe('https://ipfs.io/test-image');
      });
    });
  });

  describe('loadOwnedNFTs', () => {
    test(`it should return OwnedNFTs`, async () => {
      const mockOwnedNFTs = {
        data: [
          {
            contract: {
              address: '123',
            },
            description: 'test description',
            id: {
              tokenId: '123',
              tokenMetadata: {
                tokenType: 'ERC721',
              },
            },
            metadata: {
              description: 'test description',
              image: 'test image',
              name: 'test NFT',
            },
          },
        ],
      };
      jest.spyOn(dataUtils, 'getOwnedNFTs').mockResolvedValue(mockOwnedNFTs);

      const { result } = renderHook(() => useGetNFTs({ marketContract }));
      await act(async () => {
        const res = await result.current.loadOwnedNFTs('owner');
        expect(res[0].address).toBe('123');
        expect(res[0].owner).toBe('owner');
      });
    });

    test(`it should return image not found, empty name and description if metadata is empty `, async () => {
      const mockOwnedNFTs = {
        data: [
          {
            contract: {
              address: '123',
            },
            description: 'test description',
            id: {
              tokenId: '123',
              tokenMetadata: {
                tokenType: 'ERC721',
              },
            },
            metadata: {},
            tokenUri: {
              gateway: 'http://www.lma12312312o.com',
            },
          },
        ],
      };

      jest.spyOn(dataUtils, 'getOwnedNFTs').mockResolvedValue(mockOwnedNFTs);

      const { result } = renderHook(() => useGetNFTs({ marketContract }));
      await act(async () => {
        const res = await result.current.loadOwnedNFTs('owner');
        expect(res[0].image).toBe('not_found.png');
        expect(res[0].name).toBe('N/A');
        expect(res[0].description).toBe('N/A');
      });
    });
  });
});
