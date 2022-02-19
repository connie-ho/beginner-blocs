import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function useWalletConnection() {
  const [account, setAccount] = useState(null);
  let loggedIn = localStorage.getItem('loggedIn') || null;

  const checkWalletConnection = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Metamask not installed');
      return;
    }
    //check if user has already logged in, then set account state
    if (!loggedIn) return;

    //grab provider to get account
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    const accounts = await provider.send('eth_accounts', []);
    if (accounts.length !== 0) {
      const account = accounts[0];
      setAccount(account);
      return;
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Metamask not installed, please install metamask!');
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      console.log(provider);
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
    checkWalletConnection();
  }, [account, checkWalletConnection]);

  return {
    account,
    connectWallet,
    disconnectWallet,
  };
}

export default useWalletConnection;
