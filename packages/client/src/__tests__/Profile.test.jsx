import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithProviders } from '../lib/test-utils';
import * as useGetNFTs from '../hooks/use-get-nfts';
import { createTestNft } from '../lib/test/helper/nft';
import Profile from '../components/Profile';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';
import UserContextProvider from '../contexts/user-context';
import EthersContextProvider from '../contexts/ethers-provider-context';
import { ethers } from 'ethers';

afterEach(cleanup);

const mockedUseParams = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => mockedUseParams,
  };
});

jest.mock('../contexts/user-context', () => {
  const originalModule = jest.requireActual('../contexts/user-context');
  return {
    __esModule: true,
    UserContext: originalModule.UserContext,
    default: jest.fn(),
  };
});

jest.mock('../contexts/ethers-provider-context', () => {
  const originalModule = jest.requireActual('../contexts/ethers-provider-context');
  return {
    __esModule: true,
    EthersContext: originalModule.EthersContext,
    default: jest.fn(),
  };
});

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');
  return {
    __esModule: true,
    ...originalModule,
    Contract: jest.fn(),
    utils: jest.fn(),
  };
});

const mockcontextValue = {
  tokenContract: jest.fn(),
  marketContract: jest.fn(),
  provider: jest.fn(),
};

function mockUserContext(mockAccountAddress) {
  const originalModule = jest.requireActual('../contexts/user-context.js');
  const originalContext = originalModule.UserContext;

  UserContextProvider.mockImplementation(({ children }) => {
    return <originalContext.Provider value={{ account: mockAccountAddress }}>{children}</originalContext.Provider>;
  });
}

function mockEthersContext() {
  const originalModule = jest.requireActual('../contexts/ethers-provider-context');
  const originalContext = originalModule.EthersContext;

  EthersContextProvider.mockImplementation(({ children }) => {
    return <originalContext.Provider value={mockcontextValue}>{children}</originalContext.Provider>;
  });
}

describe('Owner Profile', () => {
  const seed = new seedrandom(`BEGINNERBLOCS`);
  const validOwnerAddress = randomHexString(seed, 0, 32);

  beforeEach(() => {
    mockUserContext(validOwnerAddress);
    mockEthersContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderProfile = async (props) => {
    const view = renderWithProviders(<Profile {...props} />);
    return {
      ...view,
    };
  };

  test('it renders owner profile without crashing', async () => {
    const nft1 = await createTestNft();
    const nft2 = await createTestNft({ tokenId: 2 });
    const nft3 = await createTestNft({ tokenId: 3 });
    const nft4 = await createTestNft({ tokenId: 4 });
    const listedNFTs = [nft1, nft2];
    const ownedNFTs = [nft3, nft4];
    const mockLoadListedNFTs = jest.fn().mockResolvedValue(listedNFTs);
    const mockLoadOwnedNFTs = jest.fn().mockResolvedValue(ownedNFTs);
    jest.spyOn(ethers.utils, 'formatEther').mockReturnValue('1');
    jest.spyOn(useGetNFTs, 'useGetNFTs').mockReturnValue({
      loadListedNFTs: mockLoadListedNFTs,
      loadOwnedNFTs: mockLoadOwnedNFTs,
    });

    const { container } = await renderProfile({ owner: true });
    expect(container).toBeVisible();
  });

  test('it renders user profile without crashing', async () => {
    const nft1 = await createTestNft();
    const nft2 = await createTestNft({ tokenId: 2 });
    const nft3 = await createTestNft({ tokenId: 3 });
    const nft4 = await createTestNft({ tokenId: 4 });
    const listedNFTs = [nft1, nft2];
    const ownedNFTs = [nft3, nft4];

    const mockLoadListedNFTs = jest.fn().mockResolvedValue(listedNFTs);
    const mockLoadOwnedNFTs = jest.fn().mockResolvedValue(ownedNFTs);

    jest.spyOn(useGetNFTs, 'useGetNFTs').mockReturnValue({
      loadUserListedNFTs: mockLoadListedNFTs,
      loadOwnedNFTs: mockLoadOwnedNFTs,
    });

    const { container } = await renderProfile({ owner: false });
    expect(container).toBeVisible();
  });
});
