import { useCallback } from 'react';

import { ethers } from 'ethers';
import axios from 'axios';
import { id } from 'ethers/lib/utils';

const useGetNFTs = () => {
  const loadNFTs = useCallback(async ({ tokenContract, marketContract }) => {
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
  }, []);

  const loadListedNFTs = useCallback(async ({ tokenContract, marketContract }) => {
    const data = await marketContract.fetchMyListedNFTs();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toStrong(), 'ether');
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
  }, []);

  const loadOwnedNFTs = useCallback(async (owner) => {
    const ownerAddr = `${owner}`;

    const apiKey = `${process.env.REACT_APP_ALCHEMY_KEY}`;
    const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${apiKey}/getNFTs/`;
    const url = `${baseURL}?owner=${ownerAddr}&withMetadata=true`;

    let resp = await axios.get(url);
    let ownedNFTs = resp.data.ownedNfts;

    const items = await Promise.all(
      ownedNFTs.map(async (NFT) => {
        let emptyMeta = {
          name: null,
          description: null,
          image: null,
        };
        let meta = Object.keys(NFT.metadata).length > 2 ? NFT.metadata : emptyMeta;
        let item = {
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

  return { loadNFTs, loadListedNFTs, loadOwnedNFTs };
};

export { useGetNFTs };
