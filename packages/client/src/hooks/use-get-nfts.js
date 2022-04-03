import { useCallback } from 'react';
import { ethers } from 'ethers';
import { getMetaData, getOwnedNFTs } from '../lib/test/data-utils/axios';
import img from '../assets/not_found.png';
import { parseImageURL } from '../lib/utils';
import axios from 'axios';

const useGetNFTs = ({ marketContract }) => {
  const parseImage = useCallback(parseImageURL);

  const backupMetadata = async (url) => {
    try {
      const metadata = await axios.get(url);
      return metadata.data;
    } catch (err) {
      const emptyMeta = {
        name: 'N/A',
        description: 'N/A',
        image: img,
      };
      return emptyMeta;
    }
  };

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
          itemId: Number(i.itemId),
          seller: i.seller,
          owner: i.owner,
          image: parseImage(meta.image),
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
          itemId: Number(i.itemId),
          tokenId: i.tokenId,
          address: i.nftContract,
          seller: i.seller,
          owner: i.owner,
          image: parseImage(meta.image),
          name: meta.name,
          description: meta.description,
        };
      })
    );
    return items;
  }, [marketContract]);

  const loadOwnedNFTs = useCallback(async (owner) => {
    const ownerAddr = `${owner}`;
    const ownedNFTs = await getOwnedNFTs(ownerAddr);
    const items = await Promise.all(
      ownedNFTs.data.map(async (NFT) => {
        const meta = Object.keys(NFT.metadata).length > 2 ? NFT.metadata : await backupMetadata(NFT.tokenUri.gateway);

        const item = {
          address: NFT.contract.address,
          tokenId: NFT.id.tokenId,
          owner: owner,
          image: parseImage(meta.image),
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );
    return items;
  }, []);

  const loadUserListedNFTs = useCallback(
    async (userAddress) => {
      const data = await marketContract.fetchUserListedNFTs(userAddress);
      const items = await Promise.all(
        data.map(async (i) => {
          const meta = await getMetaData({ contractAddress: i.nftContract, tokenId: i.tokenId.toString() });
          const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          return {
            price,
            contractAddress: i.nftContract,
            tokenId: i.tokenId,
            itemId: Number(i.itemId),
            seller: i.seller,
            owner: i.owner,
            image: parseImage(meta.image),
            name: meta.name,
            description: meta.description,
          };
        })
      );
      return items;
    },
    [marketContract]
  );

  return { loadMarketNFTs, loadListedNFTs, loadOwnedNFTs, loadUserListedNFTs };
};

export { useGetNFTs };
