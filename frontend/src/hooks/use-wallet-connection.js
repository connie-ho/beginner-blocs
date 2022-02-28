import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user-context';
import { EthersContext } from '../contexts/ethers-provider-context';

function useWalletConnection() {
  const { setAccount } = useContext(UserContext);
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
      if (!loggedIn) return;

      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length !== 0) {
        const account = accounts[0];
        setAccount(account);
        return;
      }
    };

    checkWalletConnection(setAccount);
  }, [loggedIn, setAccount, provider]);

  return {
    connectWallet,
    disconnectWallet,
  };
}

export default useWalletConnection;
