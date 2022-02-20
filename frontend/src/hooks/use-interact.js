import { pinJSONToIPFS } from "./use-pinata.js";
import { useState, useEffect } from 'react';
import useWalletConnection from "./use-wallet-connection";
import {nftAddress} from '../config';
// import 'frontend/src/artifacts/contracts/NFT.sol/NFT.json' as contractABI; //confirm where abi is placed

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../artifacts/contracts/NFT.sol/NFT.json"); 
//const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"; // need to change it to our contract address
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


function useInteract(){

  const {account, connectWallet, disconnectWallet, addWalletListener} = useWalletConnection();


  //default states
  const [walletAddress, setWallet] = useState("");
  //const [status, setStatus] = useState("");    -> dont need to set a status
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");


  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    //setStatus(walletResponse.status);
    setWallet(walletResponse);
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

  
  const mintNFT = async (url, name, description) => {
  if (url.trim() === "" || name.trim() === "" || description.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;


  window.contract = await new web3.eth.Contract(contractABI, nftAddress);

  const transactionParameters = {
    to: nftAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
  };


  return {
    walletAddress,
    mintNFT,
    onMintPressed,
    connectWalletPressed,
  };


}

export default useInteract;
