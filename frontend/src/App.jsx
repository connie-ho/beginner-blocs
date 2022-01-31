import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Nav from './components/Nav'
import Home from './components/Home'
import useWalletConnection from "./hooks/useWalletConnection";
import Profile from './components/Profile'

function App() {

  const {account, connectWallet, disconnectWallet} = useWalletConnection();

  return (
    <Router>
      <Nav connect={connectWallet}
           disconnect={disconnectWallet}
           loggedIn={account} />
      <Routes>
        <Route path="/FAQ" />
        <Route path="getting-started" />
        <Route path="/profile" element={<Profile account={account}/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
