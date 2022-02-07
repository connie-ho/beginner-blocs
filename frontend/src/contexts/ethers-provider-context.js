import React, { createContext } from 'react';
import { ethers } from 'ethers';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json';

export const EthersContext = createContext();
const EthersContextProvider = ({ children }) => {
  const provider = new ethers.providers.getDefaultProvider(process.env.REACT_APP_PROJECT_URL);
  // const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);

  const value = {
    tokenContract,
    marketContract,
  };

  return <EthersContext.Provider value={value}>{children}</EthersContext.Provider>;
};

export default EthersContextProvider;
