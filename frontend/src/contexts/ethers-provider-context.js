import React, { createContext } from 'react';
import { ethers } from 'ethers';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export const EthersContext = createContext();
const EthersContextProvider = ({ children }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // const provider = new ethers.providers.getDefaultProvider(process.env.REACT_APP_PROJECT_URL);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer);
  const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

  return <EthersContext.Provider value={{ tokenContract, marketContract }}>{children}</EthersContext.Provider>;
};

export default EthersContextProvider;
