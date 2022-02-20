import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Nav from './components/Nav'
import Home from './components/Home'
import useWalletConnection from "./hooks/use-wallet-connection";
import Minter from "./components/Minter";

function App() {

  const {account, checkWalletConnection, connectWallet, disconnectWallet, addWalletListener} = useWalletConnection();

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
        <Route path = "/create" element= {<Minter/>} />
      </Routes>
    </Router>
  );
}

export default App;
