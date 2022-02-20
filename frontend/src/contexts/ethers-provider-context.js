import React, { createContext } from 'react';
import { ethers } from 'ethers';

import { nftAddress, nftMarketAddress} from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export const EthersContext = createContext();
const EthersContextProvider = ({ children }) => {
  const provider = new ethers.providers.JsonRpcProvider();
  // const provider = new ethers.providers.getDefaultProvider(process.env.REACT_APP_PROJECT_URL);
  // const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, provider);

  return <EthersContext.Provider value={{ tokenContract, marketContract }}>{children}</EthersContext.Provider>;
};

export default EthersContextProvider;
