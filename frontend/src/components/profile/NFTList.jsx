import React from 'react';
import Grid from "@mui/material/Grid";
import CardItem from '../common/CardItem';
import { makeStyles } from '@mui/styles';
import NoItems from './NoItems';


const useStyles = makeStyles((theme)=> ({
  img: {
    width: theme.typography.pxToRem(350),
    marginBottom: theme.spacing(2),
    borderRadius: theme.typography.pxToRem(4),
  }
}))

const NFTList = (props) => {

  let testArray = [1,2,3,4]
  const classes = useStyles();
  const cardTest = testArray.map((item) => {
    return (
      <Grid item
      xs={3}
      alignItems='center'
      justifyContent='center'
      container
      sx={{padding:"2rem"}}
      >
        <CardItem>
          <img
            src={'https://statics.pampling.com/imagenes/disenos/diseno_85351.jpg'}
            alt="nft"
            className={classes.img}
            />
          <h2>Example NFT</h2>
        </CardItem>
      </Grid>
    )
  })

  if (cardTest.length === 0) {
    return (
      <NoItems type="owned"/>    
      )
  }

  return (
    <Grid item xs={12} container spacing={2} justifyContent="flex-start" alignItems="center" style={{paddingTop:"3rem"}} >
      {cardTest}
    </Grid>
  );
};

export default NFTList
