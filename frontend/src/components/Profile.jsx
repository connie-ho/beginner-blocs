import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {ethers} from "ethers";
import TabPanel from "./common/TabPanel";
import ProfileBanner from "./profile/ProfileBanner";
import AccountInfo from "./profile/AccountInfo";
import TabOptions from "./profile/TabOptions";
import NFTList from "./profile/NFTList";
import NoItems from "./profile/NoItems";

const Profile = (props) => {

  const {account} = props
  const [balance,setBalance] = useState(0)
  const [tabValue, setTabValue] = useState(1)



  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  useEffect(() => {
    const grabAccountInformation = async (account) => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        let wei = await provider.getBalance(`${account}`)
        const ethBalance = ethers.utils.formatEther(wei)
        setBalance(ethBalance)
        return
       }
    }
    grabAccountInformation(account);
  },[account, balance])


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
              <NFTList></NFTList>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <NoItems type='created'/>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <NoItems type='listed'/>
            </TabPanel>
          </div>
        </Grid>
        <Grid item xs={1}/>        
      </Grid>
    </>
  );
};

export default Profile;
