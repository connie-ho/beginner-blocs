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

  // const meta = await axios
  //   .get(tokenURI, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.PINATA_JWT_TOKEN}`,
  //       "Content-Type": "application/json",
  //       "Retry-After": 1
  //     },
  //   })
  //   .then((data) => data.data)
  //   .catch((err) => {
  //     console.log(tokenURI);
  //     console.log(err.message);
  //     console.log(err.response?.status || 500)

  //     return {
  //       image: '',
  //       name: '',
  //       description: ''
  //     }
  //   });

  //   return res.send(meta)
});

export default router;
