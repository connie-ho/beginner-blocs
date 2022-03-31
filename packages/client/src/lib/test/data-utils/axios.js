// import { useCallback } from 'react';
import axios from 'axios';

const getMetaData = async ({ contractAddress, tokenId }) => {
  try {
    const data = await axios.post('/api/nfts/meta-data', {
      contractAddress,
      tokenId,
    });
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnedNFTs = async (ownerAddress) => {
  try {
    const data = await axios.get(`/api/nfts/owned/${ownerAddress}`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export { getMetaData, getOwnedNFTs };
