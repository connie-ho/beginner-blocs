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
    indicatorColor='secondary'
    variant='fullWidth'
    centered
  >
    <Tab value={1} label="Owned" />
    <Tab value={2} label="Created" />
    <Tab value={3} label="Listed" />
  </Tabs>
  );
};

export default TabOptions;
