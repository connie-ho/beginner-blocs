import React, {useEffect, useState} from "react";
import { makeStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {ethers} from "ethers";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from "./common/TabPanel";
import ProfileBanner from "./profile/ProfileBanner";
import AccountInfo from "./profile/AccountInfo";

const useStyles = makeStyles((theme)=> ({
  tabs: {
    textColor:"primary",
    indicatorColor:"secondary",
    flexDirection:"row",
    justifyContent:"space-evenly",
  }
}))


const Profile = (props) => {

  const {account} = props
  const [balance,setBalance] = useState(0)
  const [tabValue, setTabValue] = useState(1)
  const classes = useStyles();
  
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
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor='primary'
              indicatorColor='secondary'
              variant='fullWidth'
              centered
            >
              <Tab value={1} label="Owned" />
              <Tab value={2} label="Created" />
              <Tab value={3} label="Listed" />
            </Tabs>
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
