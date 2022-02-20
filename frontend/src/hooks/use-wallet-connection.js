/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { UserContext } from '../contexts/user-context';

function useWalletConnection() {
  const { setAccount } = useContext(UserContext);
  let loggedIn = localStorage.getItem('loggedIn') || null;

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Metamask not installed, please install metamask!');
        return;
      }
      //const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      const provider = new ethers.getDefaultProvider('ropsten'); //saw this implementation here:  https://docs.ethers.io/v4/api-providers.html -> not sure but this seems like the recommended way to do it.
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

  const addWalletListener = () => {
    // can this be async?? need to check
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          //setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setAccount('');
          //setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      console.log('Insxtall metamask or a wallet provider!');
    }
  };

  useEffect(() => {
    const checkWalletConnection = async (setAccount) => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Metamask not installed');
        return;
      }
      //check if user has already logged in, then set account state
      if (!loggedIn) return;

      //grab provider to get account
      const provider = new ethers.getDefaultProvider('ropsten');
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length !== 0) {
        const account = accounts[0];
        setAccount(account);
        return;
      }
    };

    //check wallet connection
    checkWalletConnection(setAccount);

    //walletlistener for changes

    addWalletListener();
  }, []);

  return {
    connectWallet,
    disconnectWallet,
    addWalletListener,
  };
}

export default useWalletConnection;
