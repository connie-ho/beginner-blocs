import { pinJSONToIPFS } from './use-pinata';
import { nftaddress } from '../config';

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_URL;
const contractAddress = nftaddress;
const contractABI = require('../artifacts/contracts/NFT.sol/NFT.json');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

function useInteract() {
  const mintNFT = async (file, name, description) => {
    if (file === '' || name.trim() === '' || description.trim() === '') {
      return {
        success: false,

        status: '❗Please make sure all fields are completed before minting.',
      };
    }

    // make metadata
    const metadata = {};
    metadata.name = name;
    metadata.image = file.image;
    metadata.description = description;

    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      return {
        success: false,
        status: '😢 Something went wrong while uploading your tokenURI.',
      };
    }
    const tokenURI = pinataResponse.pinataUrl;

    window.contract = await new web3.eth.Contract(contractABI.abi, contractAddress);

    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods.createToken(tokenURI).encodeABI(),
    };

    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      return {
        success: true,
        status: '✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' + txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: '😥 Something went wrong: ' + error.message,
      };
    }
  };

  return {
    mintNFT,
  };
}

export { useInteract };
