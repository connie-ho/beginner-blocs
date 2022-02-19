import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material';

import { useGetNFTs } from '../hooks/use-get-nfts';
import { EthersContext } from '../contexts/ethers-provider-context';

import CardItem from './common/CardItem';
import Loading from './common/Loading';

const NFTs = () => {
  const [marketNfts, setMarketNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tokenContract, marketContract } = useContext(EthersContext);

  const { loadNFTs } = useGetNFTs();

  useEffect(() => {
    const fetchMarketItems = async (tokenContract, marketContract) => {
      try {
        const items = await loadNFTs({ tokenContract, marketContract });
        setMarketNfts(items);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketItems(tokenContract, marketContract);
  }, [loadNFTs, marketContract, tokenContract]);

  if (loading) {
    return <Loading />;
  }

  const NftCards = marketNfts?.map((nft) => (
    <CardItem>
      <img src={nft.image} alt={nft.name} />
      <h2>{nft.name}</h2>
      <p>{nft.price}</p>
    </CardItem>
  ));

  return <Grid>{NftCards}</Grid>;
};

export default NFTs;
