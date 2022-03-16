import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useGetNFTs } from '../../hooks/use-get-nfts';
import { EthersContext } from '../../contexts/ethers-provider-context';

import Loading from '../common/Loading';
import NFTCard from '../common/cards/NftCard';

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
        console.log(items);
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

  if (loading) {
    return <Loading data-testid="loading" />;
  }

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
      {NftCards}
    </Grid>
  );
};

export default MarketNFTList;
