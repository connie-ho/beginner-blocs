import React from 'react';

const TabPanel = ({ children, value, index}) => {

  return (
    <div>
      {value === index ? children : null}
    </div>
  );
};

export default TabPanel
