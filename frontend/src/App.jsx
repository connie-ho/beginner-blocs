import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Nav from './components/Nav'
import Home from './components/Home'
import useWalletConnection from "./hooks/use-wallet-connection";

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
        <Route path="/profile"/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
