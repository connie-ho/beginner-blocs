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
    if (ownerAddress) {
      const data = await axios.get(`/api/nfts/owned/${ownerAddress}`);
      return data;
    }
    return;
  } catch (err) {
    console.log(err.message);
  }
};

export { getMetaData, getOwnedNFTs };
