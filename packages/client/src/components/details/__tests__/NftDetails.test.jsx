import { renderWithProviders } from '../../../lib/test-utils';
import NftDetails from '../../NftDetails';
import axios from 'axios';
import { waitFor, screen } from '@testing-library/react';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';
import { MemoryRouter } from 'react-router-dom';
import UserContextProvider from '../../../contexts/user-context';
import EthersContextProvider from '../../../contexts/ethers-provider-context';
import { nftmarketaddress } from '../../../config';

const seed = new seedrandom(`BEGINNERBLOCS`);

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockedUseNavigate,
  };
});

jest.mock('axios');
jest.mock('../../../contexts/user-context', () => {
  const originalModule = jest.requireActual('../../../contexts/user-context');
  return {
    __esModule: true,
    // ...originalModule,
    UserContext: originalModule.UserContext,
    default: jest.fn(),
  };
});

jest.mock('../../../contexts/ethers-provider-context', () => {
  const originalModule = jest.requireActual('../../../contexts/ethers-provider-context');
  return {
    __esModule: true,
    EthersContext: originalModule.EthersContext,
    default: jest.fn(),
  };
});

function mockRouter(mockInitialHistory) {
  const rrd = require('react-router-dom');
  jest
    .spyOn(rrd, 'BrowserRouter')
    .mockImplementation(({ children }) => <MemoryRouter initialEntries={mockInitialHistory}>{children}</MemoryRouter>);
}

function mockUserContext(mockAccountAddress) {
  const originalModule = jest.requireActual('../../../contexts/user-context');
  const originalContext = originalModule.UserContext;

  UserContextProvider.mockImplementation(({ children }) => {
    return <originalContext.Provider value={{ account: mockAccountAddress }}>{children}</originalContext.Provider>;
  });
}

const mockTokenContract = {};

const mockProvider = {};

const mockMarketContract = {
  fetchItemByContractAddAndTokenID: jest
    .fn()
    .mockResolvedValue(Promise.resolve({ price: 0.01, itemId: 1, seller: randomHexString(seed, 0, 32) })),
  createMarketSale: jest.fn().mockResolvedValue({ wait: jest.fn().mockResolvedValue(Promise.resolve()) }),
  signer: randomHexString(seed, 0, 32),
  getListingPrice: jest.fn().mockResolvedValue(Promise.resolve(0.025)),
  createMarketItem: jest.fn().mockResolvedValue({ wait: jest.fn().mockResolvedValue(Promise.resolve()) }),
};

function mockEthersContext() {
  const originalModule = jest.requireActual('../../../contexts/ethers-provider-context');
  const originalContext = originalModule.EthersContext;
  const contextValue = {
    tokenContract: mockTokenContract,
    marketContract: mockMarketContract,
    provider: mockProvider,
  };

  EthersContextProvider.mockImplementation(({ children }) => {
    return <originalContext.Provider value={contextValue}>{children}</originalContext.Provider>;
  });
}

function mockAxiosWithSuccessResponse() {
  const mockResponse = {
    status: 200,
    data: {
      contract: { address: '0x5180db8f5c931aae63c74266b211f580155ecac8' },
      id: { tokenId: '1', tokenMetadata: { tokenType: 'ERC721' } },
      title: 'title',
      description: 'description',
      tokenUri: {
        raw: 'ipfs://QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/1590.json',
        gateway: 'https://ipfs.io/ipfs/QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/1590.json',
      },
      media: [{ uri: [Object] }],
      metadata: {
        image: 'https://cryptocoven.s3.amazonaws.com/a7875f5758f85544dcaab79a8a1ca406.png',
        external_url: 'https://www.cryptocoven.xyz/witches/1590',
        background_color: '',
        coven: {
          skills: [Object],
          name: 'balsa vault',
          description: [Object],
          styles: [Array],
          id: 1590,
          type: 'necromancer',
          hash: 'a7875f5758f85544dcaab79a8a1ca406',
          birthChart: [Object],
        },
        name: 'title',
        description: 'description',
        attributes: [],
      },
      timeLastUpdated: '2022-01-25T07:41:32.003Z',
    },
  };

  axios.mockResolvedValue(Promise.resolve(mockResponse));
}

function mockAxiosWithErrorResponse() {
  const mockResponse = {
    status: 400,
  };
  axios.mockResolvedValue(Promise.resolve(mockResponse));
}

function makeURL(contractAddress, tokenId, ownerAddress) {
  let url = `/nft?`;
  if (contractAddress) {
    url += `contractAddress=${contractAddress}&`;
  }
  if (tokenId) {
    url += `tokenId=${tokenId}&`;
  }
  if (ownerAddress) {
    url += `ownerAddress=${ownerAddress}`;
  }
  return url;
}

describe('NFT Details page - User not logged in', () => {
  const validContractAddress = randomHexString(seed, 0, 32);
  const validOwnerAddress = randomHexString(seed, 0, 32);

  beforeEach(() => {
    mockUserContext('');
  });

  test('it renders a loading page initially', () => {
    renderWithProviders(<NftDetails />);
    expect(screen.queryByRole('img')).toBeInTheDocument();
  });

  test('it renders 404 page if contract address is null', async () => {
    const url = makeURL(null, 1, validOwnerAddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/404'));
  });

  test('it renders 404 page if tokenId is null', async () => {
    const url = makeURL(validContractAddress, null, validOwnerAddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/404'));
  });

  test('it renders 404 page if owner address is null', async () => {
    const url = makeURL(validContractAddress, 1, null);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/404'));
  });

  test('it renders 404 page if contract address or token id is invalid', async () => {
    mockAxiosWithErrorResponse();
    const url = makeURL(validContractAddress, 1, validOwnerAddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/404'));
  });

  test('it renders correct image and metadata when everything is valid', async () => {
    mockAxiosWithSuccessResponse();
    const url = makeURL(validContractAddress, 1, validOwnerAddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);

    expect(await screen.findByAltText('description')).toBeInTheDocument();
    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(await screen.findByText('description')).toBeInTheDocument();
  });
});

describe('User logged in - Owner', () => {
  const seed = new seedrandom(`BEGINNERBLOCS`);
  const validContractAddress = randomHexString(seed, 0, 32);
  const validOwnerAddress = randomHexString(seed, 0, 32);

  beforeEach(() => {
    mockUserContext(validOwnerAddress);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it renders transfer and list components', async () => {
    mockAxiosWithSuccessResponse();
    const url = makeURL(validContractAddress, 1, validOwnerAddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);

    expect(await screen.findByText('List')).toBeInTheDocument();
    expect(await screen.findByText('Transfer')).toBeInTheDocument();
  });

  test('it does not render buy component', async () => {
    mockAxiosWithSuccessResponse();
    const url = makeURL(validContractAddress, 1, validOwnerAddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);

    await expect(async () => await screen.findByText('Buy')).rejects.toThrow();
  });
});

describe('User logged in - NFT listed', () => {
  const seed = new seedrandom(`BEGINNERBLOCS`);
  const validContractAddress = randomHexString(seed, 0, 32);
  const validOwnerAddress = randomHexString(seed, 0, 32);

  beforeEach(() => {
    mockUserContext(validOwnerAddress);
    mockEthersContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.only('it renders buy button', async () => {
    mockAxiosWithSuccessResponse();
    const url = makeURL(validContractAddress, 1, nftmarketaddress);
    mockRouter([url]);
    renderWithProviders(<NftDetails />);

    expect(await screen.findByText('Buy')).toBeInTheDocument();
  });
});
