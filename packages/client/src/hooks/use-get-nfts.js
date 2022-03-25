import { useCallback } from 'react';
import { ethers } from 'ethers';
import { getMetaData, getOwnedNFTs } from '../lib/test/data-utils/axios';
import img from '../assets/not_found.png';

const useGetNFTs = ({ marketContract }) => {
  const parseImage = useCallback((imageURL) => {
    if (imageURL && imageURL.startsWith('ipfs://')) {
      imageURL = imageURL.replace('ipfs://', 'https://ipfs.io/');
    }

    return imageURL;
  });

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

    const items = await Promise.allSettled(
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
        const emptyMeta = {
          name: 'N/A',
          description: 'N/A',
          image: img,
        };

        const meta = Object.keys(NFT.metadata).length > 2 ? NFT.metadata : emptyMeta;

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
      console.log(userAddress);
      // const data = await marketContract.fetchUserListedNFTs(userAddress);  // use this when contract that contains fetchUserListedNFTs has been deployed
      const data = await marketContract.fetchMarketItems(); // use this when contract that contains fetchUserListedNFTs has not been deployed
      const items = await Promise.allSettled(
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
            image: parseImage(meta.image),
            name: meta.name,
            description: meta.description,
          };
        })
      );
      return items;
      // });
    },
    [marketContract]
  );

  return { loadMarketNFTs, loadListedNFTs, loadOwnedNFTs, loadUserListedNFTs };
};

export { useGetNFTs };
