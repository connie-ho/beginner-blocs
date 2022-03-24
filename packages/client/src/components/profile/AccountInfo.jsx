import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AccountButton = styled(Button)`
  color: black;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2rem;
`;
const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    marginBottom: '2rem',
    marginTop: '5rem',
  },
}));

const AccountInfo = (props) => {
  const { account, balance } = props;
  const [alert, setAlert] = useState(false);

  function copyText() {
    let aux = document.createElement('input');
    aux.setAttribute('value', document.getElementById('account-button').textContent);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    handleClick();
  }

  const handleClick = () => {
    setAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const classes = useStyles();

  return (
    <div className={classes.header} name="account-info">
      <AccountButton id="account-button" data-testid="acc-button" onClick={copyText}>
        {account}
      </AccountButton>
      {balance ? <p style={{ fontSize: '1.5rem' }}>Credits: {balance} Eth</p> : null}

      <Snackbar
        style={{ backgroundColor: 'white' }}
        open={alert}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Wallet address copied!"
        action={action}
      />
    </div>
  );
};

export default AccountInfo;
