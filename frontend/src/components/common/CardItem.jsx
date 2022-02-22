import React from 'react';

import { Card } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2, 2, 2),
    height: theme.typography.pxToRem(350),
    width: theme.typography.pxToRem(300),
    borderRadius: theme.typography.pxToRem(4),
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      cursor: 'pointer',
      transform: "scale3d(1.05, 1.05, 1)",
      background: "transparent",
    },
  },
}));


const CardItem = ({ children, onClick, rootClassName, ...props }) => {
  const classes = useStyles();

  return (
    <Card 
      boxshadow={4}
      variant="outlined"
      className={`${classes.root} ${rootClassName}`} 
      onClick={onClick}
      {...props} 
      >
      {children}
    </Card>
  );
};

export default CardItem;
