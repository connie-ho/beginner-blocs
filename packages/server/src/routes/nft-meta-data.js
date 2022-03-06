import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', function (req, res, _next) {
  let { tokenURI } = req.body;

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

  return axios
    .get(tokenURI, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT_TOKEN}`,
        'Retry-After': 1,
      },
    })
    .then((data) => res.send(data.data))
    .catch((err) => {
      console.log(tokenURI);
      console.log(err.message);
      res.status(err.response?.status || 500).json({ error: err });
    });
});

export default router;
