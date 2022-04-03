import { pinJSONToIPFS } from './use-pinata';
import { nftaddress } from '../config';

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_URL;
const contractAddress = nftaddress;
const contractABI = require('../artifacts/contracts/NFT.sol/NFT.json');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

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

  const mintNFT = async (file, name, description) => {
    if (file === '' || name.trim() === '' || description.trim() === '') {
      return {
        success: false,

        status: '❗Please make sure all fields are completed before minting.',
      };
    }

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
    getCurrentWalletConnected,
    mintNFT,
  };
}

export { useInteract };
