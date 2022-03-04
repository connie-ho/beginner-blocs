import React from 'react';
import { makeStyles } from '@mui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
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

const Success = ({ successMsg }) => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <Typography sx={{mb:2}} variant="h4">{successMsg}</Typography>
      <FontAwesomeIcon icon={faCircleCheck} color={"lightGreen"} size="10x"/>
      <Button role="button" href="/profile" color="secondary" className={classes.button} variant="outlined" size="large" sx={{ mt: 2 }}>
        Go to My Profile
      </Button>
    </div>
  );
};

export default Success;
