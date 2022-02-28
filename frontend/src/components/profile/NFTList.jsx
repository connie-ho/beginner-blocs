import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import NoItems from './NoItems';
import NFTCard from '../common/cards/NftCard';


const NFTList = (props) => {
  let { items, type } = props;

  const navigate = useNavigate();

  const handleClick = useCallback((item) => {
    navigate(`/nft?ownerAddress=${item.owner}&contractAddress=${item.address}&tokenId=${item.tokenId}`)
  },[navigate])

  const NFTs = items.map((item, index) => {
    return (
      <Grid
        item
        alignItems="center"
        justifyContent="center"
        sx={{ padding: '2rem' }}
        key={`${index}-${item.address}`}
        data-testid={`nft-item-${item.tokenId}`}
      >
        <NFTCard
          onClick={() => handleClick(item)}
          image={item.image}
          name={item.name}
          price={item.price}
        />
      </Grid>
    );
  });

  if (NFTs.length === 0) {
    return <NoItems data-testid="not-found" type={type} />;
  }

  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ paddingTop: '3rem' }}
    >
      {NFTs}
    </Grid>
  );
};

export default NFTList;
