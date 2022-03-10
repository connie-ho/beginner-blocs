import express from 'express';
import dotenv from 'dotenv';
import { fetchMetaDataAlchemy } from './helpers/nft-meta-data.helper';

dotenv.config();
const router = express.Router();

router.post('/', async function (req, res, _next) {
  const { contractAddress, tokenId } = req.body;

  if (!contractAddress || !tokenId) {
    return res.status(500).json({ error: 'Contract address and tokenId must be specified' });
  }

  // if (!tokenURI) {
  //   return res.status(500).json({ error: 'Path must be specified' });
  // }

  // if (tokenURI.startsWith('data')) {
  //   return res.send({
  //     image: tokenURI.image,
  //     name: tokenURI.name,
  //     description: tokenURI.description,
  //   });
  // }

  try {
    // const meta = await fetchMetaData(tokenURI)
    const data = await fetchMetaDataAlchemy({ contractAddress, tokenId });
    if (!data.data?.metadata) {
      res.send({
        image: '',
        name: '',
        description: '',
      });
    }
    return res.send(data.data.metadata);
  } catch (err) {
    console.log(err.message);
    return res.status(err.response?.status || err.status || 500).json({ error: err.message });
  }
});

export default router;
