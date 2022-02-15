import { useEffect, useState } from "react";
import {
    mintNFT,
} from "../hooks/use-interact.js";

import {
  connectWallet,
  checkWalletConnection,
} from '../hooks/use-wallet-connection.js';

const Minter = (props) => {

  //default states
  const [walletAddress, setWallet] = useState("");
  //const [status, setStatus] = useState("");    -> dont need to set a status
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { address, status } = await checkWalletConnection();

    setWallet(address);
   // setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          //setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          //setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {

      console.log("Install metamask or a wallet provider!");
      // setStatus(
      //   <p>
      //     {" "}
      //     🦊{" "}
      //     <a target="_blank" href={`https://metamask.io/download.html`}>
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.
      //     </a>
      //   </p>
      // );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    //setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description);
    //setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setURL("");
    }
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">Create your NFT (Mint)</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      {/* <p id="status" style={{ color: "red" }}>
        {status}
      </p> */}
    </div>
  );
};

export default Minter;