import React, { createContext } from 'react';

import { ethers } from 'ethers';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json';

const EthersContext = createContext();
const EthersContextProvider = ({ children }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer);
  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  const value = {
    provider,
    signer,
    tokenContract,
    marketContract,
  };

  return <EthersContext.Provider value={value}>{children}</EthersContext.Provider>;
};

export default EthersContextProvider;
