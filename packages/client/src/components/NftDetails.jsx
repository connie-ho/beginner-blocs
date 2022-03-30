import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ethers } from 'ethers';
import axios from 'axios';

import { Grid, Button, Box, Typography, Snackbar, IconButton, InputLabel, Tab, Tabs } from '@mui/material';
import TabPanel from './common/TabPanel';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

import { EthersContext } from '../contexts/ethers-provider-context';
import { UserContext } from '../contexts/user-context';

import { nftmarketaddress } from '../config';
import { nftaddress as minterContractAddress } from '../config';
import Loading from './common/Loading';
import Success from './common/Success';

import ERC721 from '../artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json';
import List from './details/List';
import Transfer from './details/Transfer';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    width: theme.typography.pxToRem(700),
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
  },
  tabPanel: {
    marginTop: theme.spacing(3),
  },
}));

const AccountButton = styled(Button)`
  color: black;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2rem;
  margin-top: 2px;
`;

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

function parseImageURL(imageURL) {
  if (imageURL && imageURL.startsWith('ipfs://')) {
    imageURL = imageURL.replace('ipfs://', 'https://ipfs.io/');
  }

  return imageURL;
}

function NftDetails() {
  const classes = useStyles();

  const query = useQuery();
  const [contractAddress, tokenId, ownerAddress] = [
    query.get('contractAddress'),
    query.get('tokenId'),
    query.get('ownerAddress'),
  ];

  const navigate = useNavigate();

  const { marketContract } = useContext(EthersContext);
  const { account } = useContext(UserContext);

  const [nftMetadata, setNftMetadata] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [alert, setAlert] = useState(null);
  const [transactionProcessed, setTransactionProcessed] = useState(false);
  const [tabValue, setTabValue] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const fetchNFTMeta = async () => {
      if (contractAddress == null || tokenId == null || ownerAddress == null) {
        navigate('/404');
        return;
      }

      const apiKey = '-Xk_48swP3XQLraIbOIMuHxBt5bXtuJw';
      const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
      const tokenType = 'erc721';

      var config = {
        method: 'get',
        url: `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenId}&tokenType=${tokenType}`,
        headers: {},
      };

      const resp = await axios(config);
      const statusCode = Number(resp.status);

      if (statusCode < 200 || statusCode > 299) {
        navigate('/404');
        return;
      }

      if (ownerAddress === nftmarketaddress) {
        console.log(`${contractAddress}---${tokenId}---${ownerAddress}`);
        const marketItem = await marketContract.fetchItemByContractAddAndTokenID(contractAddress, tokenId);
        resp.data.price = marketItem.price;
        resp.data.itemId = marketItem.itemId;
        resp.data.seller = marketItem.seller;
      }
      setNftMetadata(resp.data);
      setIsLoading(false);
    };

    fetchNFTMeta();
  }, [contractAddress, marketContract, navigate, ownerAddress, tokenId]);

  const buy = async () => {
    try {
      const tx = await marketContract.createMarketSale(contractAddress, nftMetadata.itemId, {
        value: nftMetadata.price,
      });
      setLoadingMsg('Processing sale...Please wait. This usually takes 30 seconds.');
      await tx.wait();
      setLoadingMsg('');
      setAlert('Item purchased successfully');
      setTransactionProcessed(true);
    } catch (err) {
      setAlert(`Purchase Failed due to ${err.reason}`);
    }
  };

  const approveListing = async () => {
    // allow token from the NFT contract to be listed on the markeplace
    let minterContract = new ethers.Contract(contractAddress, ERC721.abi, marketContract.signer);
    let tx = await minterContract.approve(nftmarketaddress, tokenId);

    setLoadingMsg('Authorizing the listing...Please wait. This usually takes 30 seconds.');
    await tx.wait();
    setLoadingMsg('');
  };

  const list = async (sellingPrice) => {
    try {
      const price = ethers.utils.parseUnits(sellingPrice, 'ether');

      let listingPrice = await marketContract.getListingPrice();
      listingPrice = listingPrice.toString();

      if (contractAddress.toLowerCase() !== minterContractAddress.toLowerCase()) {
        await approveListing();
      }

      let tx = await marketContract.createMarketItem(contractAddress, tokenId, price, { value: listingPrice });

      setLoadingMsg('Listing the item...Please wait. This usually takes 30 seconds.');
      await tx.wait();
      setLoadingMsg('');

      setAlert('Item put on sale!!');
      setTransactionProcessed(true);
    } catch (err) {
      console.log(err);
      setAlert(`Operation Failed due to ${err.reason}`);
    }
  };

  const transfer = async (recipientAddress) => {
    try {
      let minterContract = new ethers.Contract(contractAddress, ERC721.abi, marketContract.signer);
      let tx = await minterContract.transferFrom(account, recipientAddress, tokenId);

      if (contractAddress.toLowerCase() !== minterContractAddress.toLowerCase()) {
        await approveListing();
      }

      setLoadingMsg('Transferring the item...Please wait. This usually takes 30 seconds.');
      await tx.wait();
      setLoadingMsg('');

      setAlert('Item Transferred!!');
      navigate(`/nft/?contractAddress=${contractAddress}&ownerAddress=${recipientAddress}&tokenId=${tokenId}`);
    } catch (err) {
      console.log(err);
      setAlert(`Operation Failed due to ${err.reason}`);
    }
  };

  const allowBuying = () => {
    if (ownerAddress == null || account == null || nftMetadata == null) return false;
    return (
      nftmarketaddress.toLowerCase() === ownerAddress.toLowerCase() &&
      account.toLowerCase() !== nftMetadata.seller.toLowerCase()
    );
  };

  const allowListingOrTransfer = () => {
    if (ownerAddress == null || account == null) return false;
    return ownerAddress.toLowerCase() === account.toLowerCase();
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(null);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (isLoading || loadingMsg !== '') {
    return <Loading loadingMsg={loadingMsg} />;
  }

  if (transactionProcessed) {
    return <Success successMsg="Transaction Complete."></Success>;
  }

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid item xs={8}>
          <Box sx={{ p: 10, textAlign: 'center' }}>
            <img
              src={parseImageURL(nftMetadata.metadata.image)}
              alt={nftMetadata.description}
              className={classes.img}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 10 }}>
            <Typography variant="h3" component="div">
              {nftMetadata.title}
            </Typography>

            <Typography sx={{ mt: 2 }} variant="body1">
              {nftMetadata.description}
            </Typography>

            <InputLabel sx={{ mt: 2 }} color="error">
              Owned By:
            </InputLabel>
            <AccountButton>{ownerAddress}</AccountButton>

            <Box sx={{ mt: 2 }}>
              {allowBuying() ? (
                <Button
                  onClick={buy}
                  color="secondary"
                  className={classes.button}
                  variant="outlined"
                  size="large"
                  endIcon={<FontAwesomeIcon icon={faEthereum} color={'#146fbe'} size="lg" />}
                >
                  {`Buy for ${ethers.utils.formatEther(nftMetadata.price)} `}
                </Button>
              ) : (
                ''
              )}
              {allowListingOrTransfer() ? (
                <>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="fullWidth"
                    centered
                    style={{ fontSize: '50rem' }}
                  >
                    <Tab sx={{ fontSize: '1.0rem' }} value={1} label="List" />
                    <Tab sx={{ fontSize: '1.0rem' }} value={2} label="Transfer" />
                  </Tabs>

                  <TabPanel value={tabValue} index={1} rootClass={classes.tabPanel}>
                    <List list={list}></List>
                  </TabPanel>
                  <TabPanel value={tabValue} index={2} rootClass={classes.tabPanel}>
                    <Transfer transfer={transfer}></Transfer>
                  </TabPanel>
                </>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        style={{ backgroundColor: 'white' }}
        open={alert !== null}
        autoHideDuration={3000}
        onClose={handleClose}
        message={alert}
        action={action}
      />
    </>
  );
}

export default NftDetails;
