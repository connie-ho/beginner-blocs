import React, { useEffect, useState, useCallback, useContext, useReducer } from 'react';
import { ethers } from 'ethers';
import { Grid, Divider } from '@mui/material';
import { UserContext } from '../contexts/user-context';
import { EthersContext } from '../contexts/ethers-provider-context';
import { useGetNFTs } from '../hooks/use-get-nfts';
import TabPanel from './common/TabPanel';
import ProfileBanner from './profile/ProfileBanner';
import AccountInfo from './profile/AccountInfo';
import TabOptions from './profile/TabOptions';
import NFTList from './profile/NFTList';
import Loading from './common/Loading';
import { useParams } from 'react-router-dom';

const Profile = ({ owner }) => {
  console.log(owner);

  const initialNFTs = {
    owned: [],
    listed: [],
  };
  // let account1 = '';
  var { account } = useContext(UserContext);
  if (!owner) {
    account = useParams().userAddress;
  }
  // let account = useContext(userContext);
  // if ( owner === false){
  //   account = useParams().userAddress;
  // }
  // if ( owner){
  //   // account = useContext(userContext);
  //   const {account} = useContext(userContext);
  //   account = account;
  // }
  // else{
  //   account = useParams().userAddress;
  // }
  // const account = owner ? useContext(userContext) : useParams().userAddress;
  console.log(account);
  // const { account } = useContext(UserContext);
  const { tokenContract, marketContract, provider } = useContext(EthersContext);

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(1);
  const [NFTs, setNFTs] = useReducer(
    (state, updates) => ({
      ...state,
      ...updates,
    }),
    initialNFTs
  );

  const handleTabChange = useCallback((_event, newValue) => {
    setTabValue(newValue);
  }, []);

  const { loadListedNFTs, loadUserListedNFTs, loadOwnedNFTs } = useGetNFTs({ tokenContract, marketContract });

  useEffect(() => {
    const grabAccountBalanceInformation = async (account) => {
      if (account) {
        let wei = await provider.getBalance(`${account}`);
        let eth = ethers.utils.formatEther(wei);
        let ethBalance = parseFloat(eth).toFixed(3);
        setBalance(ethBalance);
        return;
      }
    };
    const fetchNFTs = async (account) => {
      const listedItems = owner ? await loadListedNFTs() : await loadUserListedNFTs();
      // const listedItems = await loadListedNFTs();
      const ownedItems = await loadOwnedNFTs(account);
      setNFTs({ listed: listedItems, owned: ownedItems });
    };

    const getProfileDetails = async (account) => {
      try {
        if (owner) {
          await grabAccountBalanceInformation(account);
        }
        await fetchNFTs(account);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProfileDetails(account);
  }, [account, balance, loadListedNFTs, loadOwnedNFTs, provider]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container style={{ minHeight: '50rem' }}>
      <Grid item xs={1} />
      <Grid container item xs={10} direction="column">
        <ProfileBanner nfts={NFTs.owned} />
        <AccountInfo account={account} balance={owner ? balance : null} style={{ marginBottom: '2rem' }} />
        <div>
          <TabOptions tabValue={tabValue} handleTabChange={handleTabChange} />
          <Divider />
          <TabPanel value={tabValue} index={1}>
            <NFTList items={NFTs.owned} type="owned" />
          </TabPanel>
          {/* <TabPanel value={tabValue} index={2}>
              <NFTList items={NFTs.created} type='created'/>
            </TabPanel> */}
          <TabPanel value={tabValue} index={3}>
            <NFTList items={NFTs.listed} type="listed" />
          </TabPanel>
        </div>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Profile;
