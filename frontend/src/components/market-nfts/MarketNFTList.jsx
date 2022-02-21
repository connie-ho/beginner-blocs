import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material';

import { useGetNFTs } from '../../hooks/use-get-nfts';
import { EthersContext } from '../../contexts/ethers-provider-context'; 

import CardItem from '../common/CardItem';
import Loading from '../common/Loading';

const MarketNFTList = () => {
  const { tokenContract, marketContract } = useContext(EthersContext);

  const [marketNFTs, setMarketNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loadNFTs } = useGetNFTs({tokenContract, marketContract});

  useEffect(() => {
    const fetchMarketItems = async () => {
      try {
        const items = await loadNFTs();
        setMarketNFTs(items);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketItems();
  }, [loadNFTs]);

  if (loading) {
    return <Loading data-testid="loading"/>;
  }

  const NftCards = marketNFTs?.map((nft) => (
    <CardItem key={nft.tokenId} data-testid={`market-item-${nft.tokenId}`}>
      <img src={nft.image} alt={nft.name} />
      <h2>{nft.name}</h2>
      <p>{nft.price}</p>
    </CardItem>
  ));

  return <Grid data-testid='grid'>{NftCards}</Grid>;
};

export default MarketNFTList;
