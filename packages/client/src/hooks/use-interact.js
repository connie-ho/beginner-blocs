import { pinJSONToIPFS } from './use-pinata';
import { nftaddress } from '../config';
// import {Link} from "@mui/material";
// import { use } from 'chai';

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_URL;
const contractAddress = nftaddress;
const contractABI = require('../artifacts/contracts/NFT.sol/NFT.json');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

/*
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const obj = {
        status: '👆🏽 Write a message in the text-field above.',
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
*/
function useInteract() {
  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (addressArray.length > 0) {
          return {
            address: addressArray[0],

            status: '👆🏽 Write a message in the text-field above.',
          };
        } else {
          return {
            address: '',

            status: '🦊 Connect to Metamask using the top right button.',
          };
        }
      } catch (err) {
        return {
          address: '',

          status: '😥 ' + err.message,
        };
      }
    } else {
      return {
        address: '',

        status: (
          <span>
            <p>
              {' '}
              <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
                You must install Metamask, a virtual Ethereum wallet, in your browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  // async function loadContract() {
  //   return new web3.eth.Contract(contractABI, contractAddress);
  // }

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

    console.log('here is image metadata:', metadata.image);
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      return {
        success: false,
        status: '😢 Something went wrong while uploading your tokenURI.',
      };
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log('tokenuri is :' + tokenURI);

    console.log('this is contract addresss: ', contractAddress);
    console.log('this is contract abi: ', contractABI);

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
    getCurrentWalletConnected,
    mintNFT,
  };
}

export default useInteract;
