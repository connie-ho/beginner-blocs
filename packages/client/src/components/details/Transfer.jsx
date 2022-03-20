import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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

  const transferButton = (
    <InputAdornment position="end">
      <IconButton variant="contained" disabled={!recipientAddressValid} onClick={() => transfer(recipientAddress)}>
        <FontAwesomeIcon icon={faArrowRight} color={recipientAddressValid ? '#146fbe' : '#dddddd'} />
      </IconButton>
    </InputAdornment>
  );

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
        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        InputProps={{
          startAdornment: '0x',
          endAdornment: transferButton,
        }}
      />
    </>
  );
}

export default Transfer;
