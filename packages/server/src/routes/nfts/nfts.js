import express from 'express';
import dotenv from 'dotenv';
import { fetchMetaDataAlchemy } from '../../lib/nft-meta-data.provider';
import { fetchOwnedNFTs } from '../../lib/nft-provider';
import axios from 'axios';

dotenv.config();
const router = express.Router();

router.get('/owned/:ownerAddress', async function (req, res, _next) {
  const { ownerAddress } = req.params;

  if (!ownerAddress || ownerAddress == 'undefined') {
    return res.status(404).json({ error: 'owner address must be specified in url' });
  }

  try {
    const data = await fetchOwnedNFTs(ownerAddress);
    if (!data.data?.ownedNfts) {
      return res.send({ data: { ownedNfts: [] } });
    }
    return res.send(data.data.ownedNfts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/meta-data', async function (req, res, _next) {
  const { contractAddress, tokenId } = req.body;

  if (!contractAddress || !tokenId) {
    return res.status(500).json({ error: 'Contract address and tokenId must be specified' });
  }

  try {
    const data = await fetchMetaDataAlchemy({ contractAddress, tokenId });

    if (!data.data) {
      return res.send({
        image: '',
        name: '',
        description: '',
      });
    }
    if (data?.data?.metadata?.metadata?.length == 0) {
      const metadata = await axios.get(data?.data?.tokenUri?.gateway);
      return res.send(metadata.data);
    }
    return res.send(data.data.metadata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
