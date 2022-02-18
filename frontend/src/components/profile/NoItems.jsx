import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button } from '@mui/material';
import useMessages from '../../hooks/use-messages'

const NoItems = (props) => {
  const {type} = props
  
  const {switchMessage} = useMessages();

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
