import React from 'react';
import { makeStyles } from '@mui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { Button, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  loader: {
    height: '45rem',
    margin: '2rem',
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '5rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: theme.typography.pxToRem(250),
    borderColor: 'white',
    zIndex: 2,
    borderRadius: theme.typography.pxToRem(300),
  },
}));

const NotFound = ({ successMsg }) => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <Typography sx={{mb:2}} variant="h4">Page Not Found</Typography>
      <FontAwesomeIcon icon={faFaceFrown} size="10x"/>
      <Button role="button" href="/" color="secondary" className={classes.button} variant="outlined" size="large" sx={{ mt: 2 }}>
        Go to Home Page
      </Button>
    </div>
  );
};

export default NotFound;