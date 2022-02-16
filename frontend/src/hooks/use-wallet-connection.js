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
    //const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const provider = new ethers.getDefaultProvider('ropsten'); //saw this implementation here:  https://docs.ethers.io/v4/api-providers.html -> not sure but this seems like the recommended way to do it.
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
      //const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      const provider = new ethers.getDefaultProvider('ropsten'); //saw this implementation here:  https://docs.ethers.io/v4/api-providers.html -> not sure but this seems like the recommended way to do it.
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
    return{ 
      account,
    };
  };

  const disconnectWallet = async () => {
    localStorage.removeItem('loggedIn');
    setAccount(null);
    return;
  };

  const addWalletListener = async() => {                // can this be async?? need to check
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        //setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setAccount("");
        //setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
      console.log("Insxtall metamask or a wallet provider!");
    }
  }


  useEffect(() => {
    //check wallet connection
    checkWalletConnection();
    
    //setting account
    setAccount(account);

    //walletlistener for changes
    
    addWalletListener();

  }, [account, checkWalletConnection]);


  return {
    account,
    checkWalletConnection,
    connectWallet,
    disconnectWallet,
    addWalletListener,
  };
  
}

export default useWalletConnection;
