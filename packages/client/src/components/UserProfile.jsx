// import React, {useEffect, useState, useCallback, useContext, useReducer, createContext} from 'react';
import React, { useEffect, useState, useCallback, useReducer, useContext } from 'react';
// import { ethers } from 'ethers';
// import { nftaddress, nftmarketaddress } from '../config';
import { Grid, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
// import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import TabPanel from './common/TabPanel';
import ProfileBanner from './profile/ProfileBanner';
import AccountInfo from './profile/AccountInfo';
import TabOptions from './profile/TabOptions';
import NFTList from './profile/NFTList';
import Loading from './common/Loading';
import { useGetNFTs } from '../hooks/use-get-nfts';
import { EthersContext } from '../contexts/ethers-provider-context';

const UserProfile = () => {
  const initialNFTs = {
    owned: [],
    listed: [],
  };

  const account = useParams().userAddress;
  console.log(account);
  const { tokenContract, marketContract } = useContext(EthersContext);

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
  // let provider = ethers.getDefaultProvider('ropsten');
  // // const provider = new ethers.providers.getDefaultProvider(process.env.REACT_APP_PROJECT_URL);
  // let tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  // let marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider);

  const { loadUserListedNFTs, loadOwnedNFTs } = useGetNFTs({ tokenContract, marketContract });

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
