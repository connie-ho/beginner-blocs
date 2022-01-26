import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState('');
  let loggedIn = localStorage.getItem('loggedIn') || null;

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
    setAccount('');
    return;
  };

  useEffect(() => {
    checkWalletConnection();
  }, [account]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Warld</p>
      </header>
      {loggedIn ? (
        <button onClick={disconnectWallet}>Logout</button>
      ) : (
        <button onClick={connectWallet}>Login</button>
      )}
      <Router>
        <Routes>
          <Route path="/"></Route>
          <Route path="/FAQ"></Route>
          <Route path="getting-started"></Route>
          <Route path="/profile"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
