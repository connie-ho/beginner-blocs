import express from 'express';
import dotenv from 'dotenv';
import { fetchMetaData } from '../helpers/nft-meta-data.helper';

dotenv.config();
const router = express.Router();

router.post('/', async function (req, res, _next) {
  const { tokenURI } = req.body;

  if (!tokenURI) {
    return res.status(500).json({ error: 'Path must be specified' });
  }

  if (tokenURI.startsWith('data')) {
    return res.send({
      image: tokenURI.image,
      name: tokenURI.name,
      description: tokenURI.description,
    });
  }

  try {
    const meta = await fetchMetaData(tokenURI);
    return res.send(meta);
  } catch (err) {
    console.log(tokenURI);
    console.log(err.message);
    return res.status(err.response?.status || 500).json({ error: err.message });
  }
});

export default router;
