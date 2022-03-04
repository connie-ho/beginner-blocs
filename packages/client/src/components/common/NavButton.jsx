import React from 'react';

import { Button } from '@mui/material';

const NavButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      variant="text"
      style={{
        textDecoration: 'none',
        fontWeight: '700',
        color: 'white',
        fontSize: '1.5rem',
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavButton;
