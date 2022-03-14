import * as nftMetaDataProviders from '../../../src/routes/nft-meta-data/providers/nft-meta-data.provider';

import { createNFTMetaData } from '../../helpers';
import request from 'supertest';
import express from 'express';
import router from '../../../src/routes/nft-meta-data/nft-meta-data';

describe('nft-meta-data', () => {
  let app = null;
  beforeAll(() => {
    app = new express();
    app.use('/', router);
  });

  test.skip('POST / should return the meta data', async () => {
    const nftMeta = createNFTMetaData();
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    const res = await request(app).post('/').send({ contractAddress: 'abc', tokenId: '123' });

    expect(res.statusCode).toBe(200);
  });

  test.skip('POST / should return 500 if the contractAddress and tokenId are not specified', async () => {
    const nftMeta = createNFTMetaData();
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    const res = await request(app).post('/');

    expect(res.statusCode).toBe(500);
  });
});
