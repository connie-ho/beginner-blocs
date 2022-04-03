import React from 'react';

const TabPanel = ({ rootClass, children, value, index }) => {
  return <div className={rootClass}>{value === index ? children : null}</div>;
};

export default TabPanel;
