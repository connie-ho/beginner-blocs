import React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import NoItems from './NoItems';
import CardItem from '../common/CardItem';

const useStyles = makeStyles((theme) => ({
  img: {
    minWidth: theme.typography.pxToRem(300),
    minHeight: theme.typography.pxToRem(300),
    marginBottom: theme.spacing(2),
    borderRadius: theme.typography.pxToRem(4),
    objectFit: 'contain'
  },
}));

const NFTList = (props) => {
  let { items, type } = props;

  const classes = useStyles();
  const navigate = useNavigate();


  const handleClick = (item) => {
    navigate(`/nft?ownerAddress=${item.owner}&contractAddress=${item.address}&tokenId=${item.tokenId}`)
  }

  const NFTs = items.map((item, index) => {
    console.log(item)
    return (
      <Grid
        item
        xs={3}
        alignItems="center"
        justifyContent="center"
        container
        sx={{ padding: '2rem' }}
        key={`${index}-${item.address}`}
        data-testid={`nft-item-${item.tokenId}`}
      >
        <CardItem
          onClick={() => handleClick(item)}
        >
          <img src={item.image} alt="nft" className={classes.img} />
          <h3>{item.name}</h3>
        </CardItem>
      </Grid>
    );
  });

  if (NFTs.length === 0) {
    return <NoItems data-testid="not-found" type={type} />;
  }

  return (
    <Grid
      item
      xs={12}
      container
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
      style={{ paddingTop: '3rem' }}
    >
      {NFTs}
    </Grid>
  );
};

export default NFTList;
