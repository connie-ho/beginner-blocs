import { useCallback } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import img from '../assets/not_found.png';

const useGetNFTs = ({ marketContract }) => {
  const getMetaData = useCallback(async ({ contractAddress, tokenId }) => {
    let meta = {};

    try {
      const data = await axios.post('/api/nft-meta-data', {
        contractAddress,
        tokenId,
      });
      meta = data.data;
    } catch (err) {
      meta = {
        image: img,
        name: 'N/A',
        description: 'N/A',
      };
      console.log(err.message);
    }
    return meta;
  }, []);

  const loadMarketNFTs = useCallback(async () => {
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const meta = await getMetaData({ contractAddress: i.nftContract, tokenId: i.tokenId.toString() });
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether');

        return {
          price,
          contractAddress: i.nftContract,
          tokenId: i.tokenId,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
      })
    );
    return items;
  }, [marketContract]);

  const loadListedNFTs = useCallback(async () => {
    const data = await marketContract.fetchMyListedNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const meta = await getMetaData({ contractAddress: i.nftContract, tokenId: i.tokenId.toString() });
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether');

        return {
          price,
          itemId: i.itemId.toNumber(),
          tokenId: i.tokenId,
          address: i.nftContract,
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
      })
    );
    return items;
  }, [marketContract]);

  const loadOwnedNFTs = useCallback(async (owner) => {
    const ownerAddr = `${owner}`;

    require('dotenv').config();
    const apiKey = `${process.env.REACT_APP_ALCHEMY_KEY}`;
    const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${apiKey}/getNFTs/`;
    const url = `${baseURL}?owner=${ownerAddr}&withMetadata=true`;

    let resp = await axios.get(url);
    let ownedNFTs = resp.data.ownedNfts;

    const items = await Promise.all(
      ownedNFTs.map(async (NFT) => {
        let emptyMeta = {
          name: 'N/A',
          description: 'N/A',
          image: img,
        };

        let meta = Object.keys(NFT.metadata).length > 2 ? NFT.metadata : emptyMeta;

        const item = {
          address: NFT.contract.address,
          tokenId: NFT.id.tokenId,
          owner: owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );
    return items;
  }, []);

  return { loadMarketNFTs, loadListedNFTs, loadOwnedNFTs };
};

export { useGetNFTs };
