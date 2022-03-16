import { TextField, Button, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

function List({ list }) {
  const [priceValid, setPriceValid] = useState(true);
  const [sellingPrice, setSellingPrice] = useState('0.1');

  const handlePriceChange = (e) => {
    setSellingPrice(e.target.value);
    setPriceValid(!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) && parseFloat(e.target.value) > 0);
  };

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
        }}
      />
      <Button
        onClick={() => list(sellingPrice)}
        color="secondary"
        sx={{ ml: 2 }}
        // className={theme.button}
        variant="outlined"
        size="large"
        disabled={!priceValid}
      >
        List
      </Button>
    </>
  );
}

export default List;
