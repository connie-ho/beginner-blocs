import React, { useEffect, useState, useCallback, useContext, useReducer } from 'react';
import { ethers } from 'ethers';
import { Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user-context';
import { EthersContext } from '../contexts/ethers-provider-context';
import { useGetNFTs } from '../hooks/use-get-nfts';

import TabPanel from './common/TabPanel';
import ProfileBanner from './profile/ProfileBanner';
import AccountInfo from './profile/AccountInfo';
import TabOptions from './profile/TabOptions';
import NFTList from './profile/NFTList';
import Loading from './common/Loading';

const Profile = () => {
  const initialNFTs = {
    owned: [],
    listed: [],
  };
  const { account } = useContext(UserContext);
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
  const navigate = useNavigate();

  const handleTabChange = useCallback((_event, newValue) => {
    setTabValue(newValue);
  }, []);

  const { loadListedNFTs, loadOwnedNFTs } = useGetNFTs({ tokenContract, marketContract });

  useEffect(() => {
    if (!account) {
      navigate('/404');
      return;
    }

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
      const listedItems = await loadListedNFTs();
      const ownedItems = await loadOwnedNFTs(account);
      setNFTs({ listed: listedItems, owned: ownedItems });
    };

    const getProfileDetails = async (account) => {
      try {
        await grabAccountBalanceInformation(account);
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
        <AccountInfo account={account} balance={balance} style={{ marginBottom: '2rem' }} />
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
