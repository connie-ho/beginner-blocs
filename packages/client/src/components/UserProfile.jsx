// import React, {useEffect, useState, useCallback, useContext, useReducer, createContext} from 'react';
import React, { useEffect, useState, useCallback, useReducer } from 'react';

import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';
import { Grid, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// import { UserContext } from '../contexts/user-context';
// import { EthersContext } from '../contexts/ethers-provider-context';
// import { useGetNFTs } from '../hooks/use-get-nfts';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

import TabPanel from './common/TabPanel';
import ProfileBanner from './profile/ProfileBanner';
import AccountInfo from './profile/AccountInfo';
import TabOptions from './profile/TabOptions';
import NFTList from './profile/NFTList';
import Loading from './common/Loading';
// import axios from "axios";
// import img from "../assets/not_found.png";
import { useGetNFTs } from '../hooks/use-get-nfts';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
// import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
// import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// import {UserContext} from "../contexts/user-context";
// import {EthersContext} from "../contexts/ethers-provider-context";
// import {address} from "hardhat/internal/core/config/config-validation";
// import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

const UserProfile = () => {
  const account = useParams().userAddress;
  console.log(account);
  const initialNFTs = {
    owned: [],
    listed: [],
  };

  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(1);
  const [NFTs, setNFTs] = useReducer(
    (state, updates) => ({
      ...state,
      ...updates,
    }),
    initialNFTs
  );
  const navigate = useNavigate();

  const handleTabChange = useCallback((_event, newValue) => {
    setTabValue(newValue);
  }, []);

  // const parseImage = useCallback((imageURL) => {
  //     if (imageURL && imageURL.startsWith('ipfs://')) {
  //         imageURL = imageURL.replace('ipfs://', 'https://ipfs.io/');
  //     }
  //     return imageURL;
  // });

  // const getMetaData = useCallback(async ({contractAddress, tokenId}) => {
  //     try {
  //         const data = await axios.post('/api/nft-meta-data', {
  //             contractAddress,
  //             tokenId,
  //         });
  //         return data.data;
  //     } catch (err) {
  //         console.log(err.message);
  //     }
  // });

  let provider = ethers.getDefaultProvider('ropsten');
  // const provider = new ethers.providers.getDefaultProvider(process.env.REACT_APP_PROJECT_URL);
  let tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  let marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider);

  const { loadUserListedNFTs, loadOwnedNFTs } = useGetNFTs({ tokenContract, marketContract });

  // const loadUserListedNFTs = useCallback(async (userAddress) => {
  //     const testaddress = new marketContract.testaddress(userAddress);
  //     console.log('test:' + testaddress);
  //     console.log(provider.getCode(userAddress));
  //     // console.log(marketContract);
  //     const data = await marketContract.fetchUserListedNFTs(userAddress);
  //     // const data = await marketContract.fetchMyListedNFTs();
  //     // const data = await marketContract.fetchMarketItems();
  //     console.log(data);
  //     const items = await Promise.allSettled(
  //         data.map(async (i) => {
  //             const meta = await getMetaData({contractAddress: i.nftContract, tokenId: i.tokenId.toString()});
  //             const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
  //             return {
  //                 price,
  //                 itemId: i.itemId.toNumber(),
  //                 tokenId: i.tokenId,
  //                 address: i.nftContract,
  //                 seller: i.seller,
  //                 owner: i.owner,
  //                 image: parseImage(meta.image),
  //                 name: meta.name,
  //                 description: meta.description,
  //             };
  //         })
  //     );
  //     return items;
  //     // });
  // }, [provider, marketContract]);
  // // });
  //
  //
  // const loadOwnedNFTs = useCallback(async (account) => {
  //     require('dotenv').config();
  //     const apiKey = `${process.env.REACT_APP_ALCHEMY_KEY}`;
  //     const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${apiKey}/getNFTs/`;
  //     const url = `${baseURL}?owner=${account}&withMetadata=true`;
  //     const resp = await axios.get(url);
  //     const ownedNFTs = resp.data.ownedNfts;
  //     const items = await Promise.all(
  //         ownedNFTs.map(async (NFT) => {
  //             const emptyMeta = {
  //                 name: 'N/A',
  //                 description: 'N/A',
  //                 image: img,
  //             };
  //             const meta = Object.keys(NFT.metadata).length > 2 ? NFT.metadata : emptyMeta;
  //             const item = {
  //                 address: NFT.contract.address,
  //                 tokenId: NFT.id.tokenId,
  //                 owner: account,
  //                 image: parseImage(meta.image),
  //                 name: meta.name,
  //                 description: meta.description,
  //             };
  //             return item;
  //         })
  //     );
  //     return items;
  // // }, []);
  // });

  useEffect(() => {
    if (!account) {
      navigate('/404');
      return;
    }
    const fetchNFTs = async (account) => {
      const ownedItems = await loadOwnedNFTs(account);
      const listedItems = await loadUserListedNFTs(account);
      console.log(listedItems);
      setNFTs({ listed: listedItems, owned: ownedItems });
    };

    const getProfileDetails = async (account) => {
      try {
        await fetchNFTs(account);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfileDetails(account);

    // });
  }, [account, loadUserListedNFTs, loadOwnedNFTs]);
  // }, [account, loadOwnedNFTs]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container style={{ minHeight: '50rem' }}>
      <Grid item xs={1} />
      <Grid container item xs={10} direction="column">
        <ProfileBanner nfts={NFTs.owned} />

        <AccountInfo account={account} style={{ marginBottom: '2rem' }} />
        <div>
          <TabOptions tabValue={tabValue} handleTabChange={handleTabChange} />
          <Divider />
          <TabPanel value={tabValue} index={1}>
            <NFTList items={NFTs.owned} type="owned" />
          </TabPanel>
          {/*<TabPanel value={tabValue} index={2}>*/}
          {/*  <NFTList items={NFTs.created} type='created'/>*/}
          {/*</TabPanel>*/}
          <TabPanel value={tabValue} index={3}>
            <NFTList items={NFTs.listed} type="listed" />
          </TabPanel>
        </div>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default UserProfile;
