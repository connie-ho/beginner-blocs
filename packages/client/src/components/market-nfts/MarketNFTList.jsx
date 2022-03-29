import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Skeleton } from '@mui/material';

import { useGetNFTs } from '../../hooks/use-get-nfts';
import { EthersContext } from '../../contexts/ethers-provider-context';

import NFTCard from '../common/cards/NftCard';
import CardItem from '../common/cards/CardItem';

const MarketNFTList = (props) => {
  const { tokenContract, marketContract } = useContext(EthersContext);
  const navigate = useNavigate();
  const [marketNFTs, setMarketNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loadMarketNFTs } = useGetNFTs({ tokenContract, marketContract });

  useEffect(() => {
    const fetchMarketItems = async () => {
      try {
        const items = await loadMarketNFTs();
        setMarketNFTs(items);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketItems();
  }, [loadMarketNFTs]);

  const handleClick = useCallback(
    (item) => {
      navigate(
        `/nft?ownerAddress=${marketContract.address}&contractAddress=${item.contractAddress}&tokenId=${item.tokenId}`
      );
    },
    [navigate, marketContract]
  );

  const CardSkeleton = Array(8)
    .fill()
    .map((_num, i) => (
      <Grid item xs={3} key={`loading-${i}`}>
        <CardItem>
          <Skeleton />
          <Skeleton />
          <Skeleton variant="rectangular" width={'100%'} height={'50%'} />
        </CardItem>
      </Grid>
    ));

  const NftCards = marketNFTs?.map((nft, index) => (
    <Grid item xs={3} key={`market-item-${index}`}>
      <NFTCard
        onClick={() => handleClick(nft)}
        image={nft.image}
        name={nft.name}
        price={nft.price}
        data-testid={`market-item-${nft.tokenId}`}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '0rem',
      }}
      {...props}
    >
      {loading ? CardSkeleton : NftCards}
    </Grid>
  );
};

export default MarketNFTList;
