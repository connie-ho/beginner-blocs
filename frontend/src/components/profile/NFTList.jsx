import React from 'react';
import Grid from '@mui/material/Grid';
import CardItem from '../common/CardItem';
import { makeStyles } from '@mui/styles';
import NoItems from './NoItems';

const useStyles = makeStyles((theme) => ({
  img: {
    width: theme.typography.pxToRem(350),
    marginBottom: theme.spacing(2),
    borderRadius: theme.typography.pxToRem(4),
  },
}));

const NFTList = (props) => {
  let { items, type } = props;

  const classes = useStyles();
  const NFTs = items.map((item, index) => {
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
        <CardItem>
          <img src={item.image} alt="nft" className={classes.img} />
          <h2>{item.name}</h2>
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
