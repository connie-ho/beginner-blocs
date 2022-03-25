import React from 'react';

import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

import MarketNFTList from './market-nfts/MarketNFTList';
import home from '../assets/home.jpeg';

const useStyles = makeStyles((theme) => ({
  container: {
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
    paddingBottom: theme.spacing(1),
  },
  img: {
    width: theme.typography.pxToRem(350),
    marginBottom: theme.spacing(2),
    borderRadius: theme.typography.pxToRem(4),
  },
  card: {
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'space-around',
    fontSize: theme.typography.pxToRem(25),
  },
}));

const ExploreSection = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  padding: theme.spacing(0, 3),
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <section className={classes.container}>
        <div>
          <h1 className={classes.header}>NFTs made easy.</h1>
          <Button
            role="button"
            href="/get-started"
            color="secondary"
            className={classes.button}
            variant="outlined"
            size="large"
          >
            Get Started
          </Button>
        </div>
      </section>
      <ExploreSection>
        <h1>Explore</h1>
        <MarketNFTList data-testid="market-list" />
      </ExploreSection>
    </>
  );
};

export default Home;
