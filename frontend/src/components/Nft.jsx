import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import { ethers } from 'ethers';
import axios from "axios"

import { Grid, Button, Box, Typography, Snackbar, IconButton, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from "@mui/styles";
import styled from '@emotion/styled';

import { EthersContext } from "../contexts/ethers-provider-context"
import { UserContext } from "../contexts/user-context"

import { nftmarketaddress } from '../config';
import Loading from "./common/Loading";

const useStyles = makeStyles(theme => ({
    img: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        width: theme.typography.pxToRem(700),
    },
    imgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing(5)
    },
}));

const AccountButton = styled(Button)`
color: black;
font-size: 1rem;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
border-radius: 2rem;

`

const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Nft(props) {
    const classes = useStyles()
    
    const query = useQuery();
    const [contractAddress, tokenId, ownerAddress] = [query.get("contractAddress"), query.get("tokenId"), query.get("ownerAddress")];
    
    const { tokenContract, marketContract } = useContext(EthersContext)
    const { account, setAccount } = useContext(UserContext);
    
    const [nftMetadata, setNftMetadata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [priceValid, setPriceValid] = useState(false);
    const [sellingPrice, setSellingPrice] = useState(0)
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchNFTMeta = async () => {

            if (contractAddress === undefined || tokenId === undefined || ownerAddress === undefined) {
                // TODO: Redirect to 404
                return;
            }

            const apiKey = `${process.env.REACT_APP_ALCHEMY_KEY}`;
            const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
            const tokenType = "erc721";

            var config = {
                method: 'get',
                url: `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenId}&tokenType=${tokenType}`,
                headers: {}
            };

            const resp = await axios(config)

            if (ownerAddress === nftmarketaddress) {
                const marketItem = await marketContract.fetchItemByContractAddAndTokenID(contractAddress, tokenId)
                nftMetadata.price = marketItem.price
                nftMetadata.itemId = marketItem.itemId
            }
            setNftMetadata(resp.data)
            setIsLoading(false)
        };

        fetchNFTMeta()
    }, []);

    const buy = async () => {
        try {
            const result = await marketContract.createMarketSale(tokenContract, nftMetadata.itemId)
            setAlert("Item purchased successfully")
        }
        catch (err) {
            setAlert(`Purchase Failed due to ${err.reason}`)
        }
    };

    const list = async () => {
        try {
            const price = ethers.utils.parseUnits(sellingPrice, 'ether');
            let listingPrice = await marketContract.getListingPrice()
            listingPrice = listingPrice.toString()
            console.log(listingPrice)

            const result = await marketContract.createMarketItem(contractAddress,
                tokenId,
                price,
                { value: listingPrice });
            setAlert("Item put on sale!!")
        }
        catch (err) {
            console.log(err)
            setAlert(`Operation Failed due to ${err.reason}`)
        }
    };

    const allowBuying = () => {
        return ownerAddress !== undefined && nftmarketaddress.toLowerCase() === ownerAddress.toLowerCase();
    };

    const allowListing = () => {
        console.log(ownerAddress)
        console.log(account)
        return ownerAddress !== undefined && ownerAddress.toLowerCase() === account.toLowerCase();
    };

    const handlePriceChange = (e) => {
        setSellingPrice(e.target.value)
        setPriceValid(!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) && parseFloat(e.target.value) > 0)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(null);
    };
    
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    if (isLoading) {
        return (
           <Loading/>
        );
    }

    return (
        <>
            <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={8}>
                    <Box sx={{ p: 10, textAlign: "center" }}>
                        <img
                            src={nftMetadata.metadata.image}
                            alt={nftMetadata.description}
                            className={classes.img}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ p: 10 }}>
                        <Typography variant="h3" component="div">{nftMetadata.title}</Typography>
                        <Typography variant="body1">{nftMetadata.description}</Typography>
                        <AccountButton>{ownerAddress}</AccountButton>
                        {allowBuying() ?
                            <Button onClick={buy} color="secondary" className={classes.button} variant="outlined" size="large">
                                Buy {nftMetadata.price}
                            </Button> : ""
                        }
                        {allowListing() ?
                            <>
                                <TextField
                                    required
                                    error={!priceValid}
                                    id="price"
                                    label="Price"
                                    type="number"
                                    variant="standard"
                                    helperText={priceValid ? "" : "Enter a valid price"}
                                    value={sellingPrice}
                                    onChange={handlePriceChange}
                                />
                                <Button onClick={list} color="secondary" sx={{ ml: 2 }} className={classes.button} variant="outlined" size="large" disabled={!priceValid}>
                                    List
                                </Button>
                            </> : ""
                        }
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                style={{ backgroundColor: "white" }}
                open={alert !== null}
                autoHideDuration={3000}
                onClose={handleClose}
                message={alert}
                action={action}
            />
        </>
    );
};

export default Nft