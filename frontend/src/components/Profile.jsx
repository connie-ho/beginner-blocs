import React, {useEffect, useState, useCallback, useContext, useReducer} from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {ethers} from "ethers";
import TabPanel from "./common/TabPanel";
import ProfileBanner from "./profile/ProfileBanner";
import AccountInfo from "./profile/AccountInfo";
import TabOptions from "./profile/TabOptions";
import NFTList from "./profile/NFTList";
import NoItems from "./profile/NoItems";
import { EthersContext } from '../contexts/ethers-provider-context';
import { useGetNFTs } from '../hooks/use-get-nfts';

const Profile = (props) => {

  const initialNFTs ={
    created:[],
    owned:[],
    listed:[]
  }
  const {account} = props
  const [loading, setLoading] = useState(true)
  const [balance,setBalance] = useState(0)
  const [tabValue, setTabValue] = useState(1)
  const [NFTs, setNFTs] = useReducer((state, updates) => ({
      ...state,
      ...updates
    }),
    initialNFTs)

  const { tokenContract, marketContract } = useContext(EthersContext)

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);

  }, [])

  const { loadCreatedNFTs, loadOwnedNFTs } = useGetNFTs()

  useEffect(() => {
    const grabAccountInformation = async (account) => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        let wei = await provider.getBalance(`${account}`)
        let eth = ethers.utils.formatEther(wei)
        let ethBalance = parseFloat(eth).toFixed(3)
        setBalance(ethBalance)
        return
       }
    }
    grabAccountInformation(account);
  },[account, balance])

  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const createdItems = await loadCreatedNFTs({tokenContract, marketContract})
        const ownedItems = await loadOwnedNFTs({tokenContract, marketContract})
        
        setNFTs({created: createdItems,
                 owned: ownedItems})
      }
      catch(err) {
        console.log(err.message)
      }
    }

    fetchItems()
  },[])

  

  return (
    <>
      <Grid container style={{minHeight:'100rem'}}>
        <Grid item xs={1}/>
        <Grid item xs={10} container direction ="column">
          <ProfileBanner/>
          <AccountInfo account={account} balance={balance} style={{marginBottom:'2rem'}}/>
          <div>
            <TabOptions tabValue={tabValue} handleTabChange={handleTabChange} />
            <Divider/>
            <TabPanel value={tabValue} index={1}>
              <NFTList items={NFTs.owned} type='owned'/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <NFTList items={NFTs.created} type='created'/>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <NFTList items={NFTs.listed} type='listed'/>
            </TabPanel>
          </div>
        </Grid>
        <Grid item xs={1}/>        
      </Grid>
    </>
  );
};

export default Profile;
