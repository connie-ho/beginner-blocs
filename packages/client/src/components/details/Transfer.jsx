import { TextField, Button } from '@mui/material';
import { useState } from 'react';

function Transfer({ transfer }) {
  const [recipientAddressValid, setRecipientAddressValid] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');

  const ADDRESS_REGEX = /^(0x)?[0-9a-fA-F]{40}$/i;

  const handleRecipientAddressChange = (e) => {
    const address = e.target.value;

    let addressValid = Boolean(address);
    addressValid = addressValid && address.toLowerCase().match(ADDRESS_REGEX);

    setRecipientAddressValid(addressValid);
    setRecipientAddress(address);
  };

  return (
    <>
      <TextField
        required
        error={!recipientAddressValid}
        id="recipient"
        label="Recipient"
        variant="standard"
        helperText={recipientAddressValid ? '' : 'Enter a valid Recipient Address'}
        value={recipientAddress}
        onChange={handleRecipientAddressChange}
        InputProps={{
          startAdornment: '0x',
        }}
      />
      <Button
        onClick={() => transfer(recipientAddress)}
        color="secondary"
        sx={{ ml: 2 }}
        // className={theme.button}
        variant="outlined"
        size="large"
        disabled={!recipientAddressValid}
      >
        Transfer
      </Button>
    </>
  );
}

export default Transfer;
