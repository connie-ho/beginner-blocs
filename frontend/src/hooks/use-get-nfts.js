import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import axios from 'axios';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json';

const useGetNFTs = () => {
  const loadNFTs = async () => {
    // const provider = new ethers.providers.getDefaultProvider('https://ropsten.infura.io/v3/0f9683418f3d46a6b4904bee7eea9f7c')
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );

    return items;
  };

  return { loadNFTs };
};

export { useGetNFTs };
