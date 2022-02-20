import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { useGetNFTs } from '../hooks/use-get-nfts';

import CardItem from './common/CardItem';
import Loading from './common/Loading';

const NFTs = () => {
  const [marketNfts, setMarketNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loadNFTs } = useGetNFTs();

  useEffect(() => {
    const fetchMarketItems = async () => {
      try {
        const items = await loadNFTs();
        setMarketNfts(items);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketItems();
  }, [loadNFTs]);

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
