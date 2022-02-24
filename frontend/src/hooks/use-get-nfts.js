import { useCallback } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import img from '../assets/not_found.png';

import ERC721 from '../artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json';

const useGetNFTs = ({ tokenContract, marketContract }) => {
  const loadNFTs = useCallback(async () => {
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        let minterContract = new ethers.Contract(i.nftContract, ERC721.abi, marketContract.signer);
        const tokenUri = await minterContract.tokenURI(i.tokenId);
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
  }, [tokenContract, marketContract]);

  const loadListedNFTs = useCallback(async () => {
    const data = await marketContract.fetchMyListedNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        // allow token from the NFT contract to be listed on the markeplace
        let minterContract = new ethers.Contract(i.nftContract, ERC721.abi, marketContract.signer);
        const tokenUri = await minterContract.tokenURI(i.tokenId);
        const meta = await axios({
          method: 'get',
          url: tokenUri.startsWith('ipfs') ? `https://ipfs.io/ipfs/${tokenUri.substring(12)}` : tokenUri,
          withCredentials: false,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          tokenId: i.tokenId,
          address: i.nftContract,
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
  }, [tokenContract, marketContract]);

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
          name: 'N/A',
          description: 'N/A',
          image: img,
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
