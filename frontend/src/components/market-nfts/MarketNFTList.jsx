import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useGetNFTs } from '../../hooks/use-get-nfts';
import { EthersContext } from '../../contexts/ethers-provider-context'; 

import CardItem from '../common/CardItem';
import Loading from '../common/Loading';

const MarketNFTList = (props) => {
  const { tokenContract, marketContract } = useContext(EthersContext);
  const navigate = useNavigate();
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

  const handleClick = useCallback((item) => {
    navigate(`/nft?ownerAddress=${marketContract.address}&contractAddress=${item.contractAddress}&tokenId=${item.tokenId}`)
  },[navigate, marketContract])


  if (loading) {
    return <Loading data-testid="loading"/>;
  }

  const NftCards = marketNFTs?.map((nft) => (
    <Grid item xs={4}>
      <CardItem onClick={() => handleClick(nft)} key={nft.tokenId} data-testid={`market-item-${nft.tokenId}`}>
        <img src={nft.image} alt={nft.name} />
        <h2>{nft.name}</h2>
        <p>{nft.price}</p>
      </CardItem>
    </Grid>
  ));

  return <Grid {...props}>{NftCards}</Grid>;
};

export default MarketNFTList;
