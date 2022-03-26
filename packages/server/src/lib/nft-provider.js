import axios from 'axios';
import rax from 'retry-axios';
import dotenv from 'dotenv';
dotenv.config();

rax.attach();
const fetchOwnedNFTs = async (ownerAddress) => {
  const retryConfig = {
    raxConfig: {
      retry: 5,
      noResponseRetries: 5,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt} for ${ownerAddress}`);
      },
    },
  };
  const baseURL = `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}/getNFTs/`;
  const tokenURL = `${baseURL}?owner=${ownerAddress}&withMetadata=true`;
  const data = await axios.get(tokenURL, retryConfig);

  return data;
};

export { fetchOwnedNFTs };
