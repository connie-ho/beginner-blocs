import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme)=> ({
  header: {
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    marginBottom: '2rem',
    marginTop:'10rem'
  },
}))

const AccountInfo = (props) => {
  const {account, balance} = props

  const classes = useStyles();
  return (
    <div className={classes.header} name='account-info'>
      <h2>{account}</h2>
      <h2>Credits: {balance} Eth</h2>
  </div>
  );
};

export default AccountInfo;
