import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "./App.css";

function App() {

  const [account, setAccount] = useState("");

  const checkWalletConnection = async () => {
    const {ethereum} = window;
    if (!ethereum) {
      console.log('Metamask not installed')
      return;
    }
    else {
      console.log('Ethereum object detected', ethereum)
    }

    const accounts = await ethereum.request({method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0]
      setAccount(account)
  
    } else {
      console.log("No account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Metamask not installed, please install metamask!")
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts"});

      setAccount(accounts[0]);

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    checkWalletConnection();
  },[])

  
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Warld</p>
      </header>
      {account !== "" ?
      <p>Account connected</p> :
      <button onClick={connectWallet}>Connect Wallet</button>
      }
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
