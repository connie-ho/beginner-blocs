import React from 'react';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../lib/test-utils';
import Nav from '../Nav';
import { randomHexString } from '@ethersproject/testcases';
import seedrandom from 'seedrandom';
import UserContextProvider from '../../contexts/user-context';

afterEach(cleanup);

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockedUseNavigate,
  };
});

jest.mock('../../contexts/user-context', () => {
  const originalModule = jest.requireActual('../../contexts/user-context');
  return {
    __esModule: true,
    UserContext: originalModule.UserContext,
    default: jest.fn(),
  };
});

function mockUserContext(mockAccountAddress) {
  const originalModule = jest.requireActual('../../contexts/user-context.js');
  const originalContext = originalModule.UserContext;

  UserContextProvider.mockImplementation(({ children }) => {
    return (
      <originalContext.Provider value={{ account: mockAccountAddress, disconnectWallet: jest.fn() }}>
        {children}
      </originalContext.Provider>
    );
  });
}

describe('Nav - User not logged in', () => {
  beforeEach(() => {
    mockUserContext('');
  });

  test('Nav renders initially', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('home')).toBeInTheDocument();
  });

  test('Nav renders login', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByText('Login')).toBeInTheDocument();
  });

  test('Nav renders connectwallet', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('connectwallet')).toBeInTheDocument();
  });

  test('Nav do not render create', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('create')).not.toBeInTheDocument();
  });

  test('Nav do not render Profile', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  test('Nav do not render Logout', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});

describe('Nav - User logged in', () => {
  const seed = new seedrandom(`BEGINNERBLOCS`);
  const validOwnerAddress = randomHexString(seed, 0, 32);

  beforeEach(() => {
    mockUserContext(validOwnerAddress);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Nav renders initially', () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('home')).toBeInTheDocument();
  });

  test('it renders create button', async () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('create')).toBeInTheDocument();
  });

  test('it renders usermenu', async () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('usermenu')).toBeInTheDocument();
  });

  test('it renders logout', async () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByText('Logout')).toBeInTheDocument();
  });

  test('it redirects when logout', async () => {
    renderWithProviders(<Nav />);
    fireEvent.click(screen.queryByText('Logout'));
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/'));
  });

  test('it renders profile', async () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByText('Profile')).toBeInTheDocument();
  });

  test('it redirects when click on profile', async () => {
    renderWithProviders(<Nav />);
    fireEvent.click(screen.queryByText('Profile'));
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/Profile'));
  });

  test('user can not connect wallet again', async () => {
    renderWithProviders(<Nav />);
    expect(screen.queryByTestId('connectwallet')).not.toBeInTheDocument();
  });
});
