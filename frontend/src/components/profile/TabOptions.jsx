import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabOptions = (props) => {
  const {tabValue, handleTabChange} = props
  return (
    <Tabs
    value={tabValue}
    onChange={handleTabChange}
    textColor='primary'
    indicatorColor='primary'
    variant='fullWidth'
    centered
    style={{fontSize:'50rem'}}
  >
    <Tab sx={{fontSize:'1.5rem'}} value={1} label="Owned" />
    {/* <Tab sx={{fontSize:'1.5rem'}} value={2} label="Created" /> */}
    <Tab sx={{fontSize:'1.5rem'}} value={3} label="Listed" />
  </Tabs>
  );
};

export default TabOptions;
