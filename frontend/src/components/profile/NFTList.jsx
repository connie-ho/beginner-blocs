import React from 'react';
import Grid from "@mui/material/Grid";
import CardItem from '../common/CardItem';
const NFTList = (props) => {
  let testArray = [1,2,3,4,5,6,7,8,9,10]

  const cardTest = testArray.map((item) => {
    return (
      <Grid item xs={12}
      sm={8}
      md={6}
      lg={4} style={{padding:"1.5rem 1.5rem"}}
      >
        <CardItem>
          <img
            src={'https://statics.pampling.com/imagenes/disenos/diseno_85351.jpg'}
            alt="nft"
            />
          <h2>Example NFT</h2>
        </CardItem>
      </Grid>
    )
  })

  return (
    <Grid item xs={12} container style={{padding:"3rem"}} >
      {cardTest}
    </Grid>
  );
};

export default NFTList
