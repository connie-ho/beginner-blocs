import React from "react";

import home from '../assets/home.jpeg'
import { makeStyles } from '@mui/styles';
import { Button } from "@mui/material";

const useStyles = makeStyles((theme)=> ({
  container: {
    width: '100%',
    height: '50vh',
    background: `url(${home}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 3),
  },
  header: {
    color: theme.palette.text.light,
    paddingBottom: theme.spacing(1)
  }
}))

const Home = () => {

  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.header}>
          NFTs made easy.
        </h1>
        <Button href="/getting-started" color="secondary" className={classes.button} variant="outlined" size="large">
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Home;
