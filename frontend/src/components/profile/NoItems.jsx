import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button } from '@mui/material';
const useStyles = makeStyles((theme)=> ({
  root: {
    fontSize: '5rem'
  }
}))

const NoItems = (props) => {
  const classes = useStyles();
  const {type} = props
  
  const switchMessage = type => {
    let messages = {
      message: "Try browsing the marketplace to find something for you!",
      type: "Marketplace"
    }
    if (type == 'created') {
      messages.message = "Come back soon, or try creating an NFT below!";
      messages.type = "Create NFT";
      return messages
    }
    else if (type == "listed") {
      messages.message = "Come back soon, or try listing an NFT below!";
      messages.type = "List NFT";
      return messages
    }
    else {
      return messages
    }
  }

  let messages = switchMessage(type);

  return (
    <Grid item xs={12} container spacing={2} flexDirection="column" alignItems="center" style={{paddingTop:"10rem", minHeight:"50rem"}} >
      <Typography gutterBottom={true} variant='h2'>No Items Found!</Typography>
      <Typography gutterBottom={true} mt={1} mb={2} style={{fontSize:'2rem', opacity:'0.4'}} variant='body1' >{messages.message}</Typography>
      <Button size='large' sx={{fontSize:'1.5rem', borderRadius:'2rem', marginTop:'1rem'}} variant='contained' color='primary'>{messages.type}</Button>
    </Grid>
  );
};

export default NoItems;
