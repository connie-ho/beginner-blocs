import React, { createContext, useState, useContext, useEffect } from 'react';
import { EthersContext } from './ethers-provider-context';
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [accLoading, setAccLoading] = useState(true);
  const { provider } = useContext(EthersContext);
  let loggedIn = localStorage.getItem('loggedIn') || null;

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Metamask not installed, please install metamask!');
        return;
      }

      await provider.send('wallet_requestPermissions', [
        {
          eth_accounts: {},
        },
      ]);

      const accounts = await provider.send('eth_requestAccounts');

      localStorage.setItem('loggedIn', 'true');
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    localStorage.removeItem('loggedIn');
    setAccount(null);
    return;
  };

  useEffect(() => {
    const checkWalletConnection = async (setAccount) => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Metamask not installed');
        return;
      }
      //check if user has already logged in, then set account state
      if (!loggedIn) {
        setAccLoading(false);
        return;
      }

      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length !== 0) {
        const account = accounts[0];
        setAccount(account);
        setAccLoading(false);
        return;
      }
    };

    checkWalletConnection(setAccount);
  }, [loggedIn, setAccount, provider, accLoading]);

  return (
    <UserContext.Provider value={{ account, setAccount, connectWallet, disconnectWallet, accLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
