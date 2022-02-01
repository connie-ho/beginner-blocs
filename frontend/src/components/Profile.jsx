import React, {useEffect, useState} from "react";
import { makeStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {ethers} from "ethers";
import TabPanel from "./common/TabPanel";
import ProfileBanner from "./profile/ProfileBanner";
import AccountInfo from "./profile/AccountInfo";
import TabOptions from "./profile/TabOptions";


const Profile = (props) => {

  const {account} = props
  const [balance,setBalance] = useState(0)
  const [tabValue, setTabValue] = useState(1)

  const grabAccountInformation = async (account) => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      let wei = await provider.getBalance(`${account}`)
      const ethBalance = ethers.utils.formatEther(wei)
      setBalance(ethBalance)
      return
     }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  useEffect(async () => {
    grabAccountInformation(account);
    return () => {
      setBalance(0);
    }
  },[account, balance])


  return (
    <>
      <Grid container >
        <Grid item xs={1}/>
        <Grid item xs={10} container direction ="column">
          <ProfileBanner/>
          <AccountInfo account={account} balance={balance} style={{marginBottom:'2rem'}}/>
          <div>
            <TabOptions tabValue={tabValue} handleTabChange={handleTabChange} />
            <Divider/>
            <TabPanel value={tabValue} index={1}>
                <h1>Hello World</h1>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
            <h2>Hello World2</h2>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
            <h2>Hello World3</h2>
            </TabPanel>
          </div>
        </Grid>
        <Grid item xs={1}/>        
      </Grid>
    </>
  );
};

export default Profile;
