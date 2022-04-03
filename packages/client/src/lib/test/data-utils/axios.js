// import { useCallback } from 'react';
import axios from 'axios';

const getMetaData = async ({ contractAddress, tokenId }) => {
  try {
    const data = await axios.post('/api/nfts/meta-data', {
      contractAddress,
      tokenId,
    });
    console.log(data);
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnedNFTs = async (ownerAddress) => {
  try {
    if (ownerAddress) {
      const data = await axios.get(`/api/nfts/owned/${ownerAddress}`);
      console.log(data);
      return data;
    }
    return;
  } catch (err) {
    console.log(err.message);
  }
};

export { getMetaData, getOwnedNFTs };
