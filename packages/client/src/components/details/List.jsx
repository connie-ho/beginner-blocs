import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function List({ list }) {
  const [priceValid, setPriceValid] = useState(true);
  const [sellingPrice, setSellingPrice] = useState('0.1');

  const handlePriceChange = (e) => {
    setSellingPrice(e.target.value);
    setPriceValid(!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) && parseFloat(e.target.value) > 0);
  };

  const listButton = (
    <InputAdornment position="end">
      <IconButton variant="contained" onClick={() => list(sellingPrice)} disabled={!priceValid}>
        <FontAwesomeIcon icon={faArrowRight} color={priceValid ? '#146fbe' : '#dddddd'} />
      </IconButton>
    </InputAdornment>
  );

  return (
    <>
      <TextField
        required
        error={!priceValid}
        id="price"
        label="Price"
        type="number"
        variant="standard"
        helperText={priceValid ? '' : 'Enter a valid price'}
        value={sellingPrice}
        onChange={handlePriceChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faEthereum} color={'#146fbe'} size="lg" />
            </InputAdornment>
          ),
          endAdornment: listButton,
        }}
      />
    </>
  );
}

export default List;
