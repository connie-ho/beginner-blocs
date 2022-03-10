import axios from 'axios';
import rax from 'retry-axios';
import dotenv from 'dotenv';
dotenv.config();

rax.attach();
const fetchMetaData = async (tokenURI) => {
  const retryConfig = {
    raxConfig: {
      retry: 5, // number of retry when facing 4xx or 5xx
      noResponseRetries: 5, // number of retry when facing connection error
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt} for ${tokenURI}`); // track current trial
      },
    },
  };

  const meta = await axios.get(tokenURI, retryConfig);
  return meta.data;
};

rax.attach();
const fetchMetaDataAlchemy = async ({ tokenId, contractAddress }) => {
  const retryConfig = {
    raxConfig: {
      retry: 5,
      noResponseRetries: 5,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt} for ${tokenId} on ${contractAddress}`);
      },
    },
  };
  const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}/getNFTMetadata`;
  const tokenURL = `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenId}&tokenType=erc721`;
  const data = await axios.get(tokenURL, retryConfig);

  return data;
};

export { fetchMetaData, fetchMetaDataAlchemy };
