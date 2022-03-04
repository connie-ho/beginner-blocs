import React from 'react';
import { makeStyles } from '@mui/styles';

import img from '../../assets/spinner.gif';

const useStyles = makeStyles((theme) => ({
  loader: {
    height: '45rem',
    margin: '2rem',
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '5rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: theme.typography.pxToRem(250),    
    borderColor: 'white',
    zIndex: 2,
    borderRadius: theme.typography.pxToRem(300),
  },
}));

const Loading = ({loadingMsg}) => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      {loadingMsg}
      <img className={classes.img} src={img} alt="default" name="avatar" />
    </div>
  );
};

export default Loading;
