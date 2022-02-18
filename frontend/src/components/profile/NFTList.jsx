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
  
  let {items,type} = props
  const classes = useStyles();
  const cardTest = items.map((item) => {
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
            src={item.image}
            alt="nft"
            className={classes.img}
            />
          <h2>{item.name}</h2>
        </CardItem>
      </Grid>
    )
  })

  if (cardTest.length === 0) {
    return (
      <NoItems type={type}/>    
      )
  }

  return (
    <Grid item xs={12} container spacing={2} justifyContent="flex-start" alignItems="center" style={{paddingTop:"3rem"}} >
      {cardTest}
    </Grid>
  );
};

export default NFTList
