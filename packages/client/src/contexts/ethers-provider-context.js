import React, { createContext } from 'react';
import { ethers } from 'ethers';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export const EthersContext = createContext();
const EthersContextProvider = ({ children }) => {
  let provider = ethers.getDefaultProvider('ropsten');
  let signer = null;
  let tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  let marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider);

  const { ethereum } = window;

  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    // const provider = new ethers.providers.getDefaultProvider(process.env.REACT_APP_PROJECT_URL);
    signer = provider.getSigner();
    tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
  }

  return (
    <EthersContext.Provider value={{ tokenContract, marketContract, provider }}>{children}</EthersContext.Provider>
  );
};

export default EthersContextProvider;
