import axios from 'axios';
import rax from 'retry-axios';

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

export { fetchMetaData };
