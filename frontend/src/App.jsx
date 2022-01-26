import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ethers } from 'ethers';

import Nav from './components/Nav'
import Home from './components/Home'

function App() {
  const [account, setAccount] = useState(null);
  let loggedIn = localStorage.getItem("loggedIn") || null;
  
  const checkWalletConnection = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Metamask not installed');
      return;
    } else {
      console.log('Ethereum object detected', ethereum);
    }

    //check if user has already logged in, then set account state
    if (loggedIn) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const accounts = await provider.send('eth_accounts', []);

      if (accounts.length !== 0) {
        const account = accounts[0];
        setAccount(account);
        return;
      } else {
        console.log('No account found');
      }
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Metamask not installed, please install metamask!');
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
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
  }, [account]);

  return (
    <Router>
      <Nav connect={connectWallet}
           disconnect={disconnectWallet}
           loggedIn={account} />
      <Routes>
        <Route path="/FAQ" />
        <Route path="getting-started" />
        <Route path="/profile"/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
