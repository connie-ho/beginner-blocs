import { useEffect, useState } from "react";
// import {
//     mintNFT,
// } from "../hooks/use-interact.js";

// import {
//   connectWallet,
//   checkWalletConnection,
// } from '../hooks/use-wallet-connection.js';
import useInteract from '../hooks/use-interact';
import useWalletConnection from '../hooks/use-wallet-connection';

const Minter = (props) => {

  //default states
  const [walletAddress, setWallet] = useState("");
  //const [status, setStatus] = useState("");    -> dont need to set a status
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  
  const {account, checkWalletConnection, connectWallet, disconnectWallet, addWalletListener} = useWalletConnection();
  const {accountAddress, mintNFT, onMintPressed, connectWalletPressed} = useInteract(); //calling it account address cause walletAddress is already declared above
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { address, status } = await checkWalletConnection();

    //sets wallet address
    setWallet(address);
  
    //Checks if the user's account changes
    addWalletListener();
  }, [walletAddress]);


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