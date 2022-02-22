import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import useMessages from '../../hooks/use-messages';

const NoItems = (props) => {
  const { type } = props;

  const { switchMessage } = useMessages();

  let messages = switchMessage(type);

  return (
    <Grid
      item
      xs={12}
      container
      spacing={2}
      flexDirection="column"
      alignItems="center"
      style={{ paddingTop: '5rem', minHeight: '20rem' }}
    >
      <Typography gutterBottom={true} variant="h3">
        No Items Found!
      </Typography>
      <Typography gutterBottom={true} mt={0} mb={2} style={{ fontSize: '1rem', opacity: '0.4' }} variant="body1">
        {messages.message}
      </Typography>
      <Button
        size="large"
        sx={{ fontSize: '1rem', borderRadius: '2rem', marginTop: '1rem' }}
        variant="contained"
        color="primary"
      >
        {messages.type}
      </Button>
    </Grid>
  );
};

export default NoItems;
