import * as nftMetaDataProviders from '../../../src/routes/nft-meta-data/providers/nft-meta-data.provider';

import { createNFTMetaData } from '../../helpers';
import request from 'supertest';
import express from 'express';
import router from '../../../src/routes/nft-meta-data/nft-meta-data';

let app = null;
app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
describe('nft-meta-data', () => {
  test('POST / should return the meta data', async () => {
    const nftMeta = createNFTMetaData();
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    const res = await request(app).post('/').type('json').send({ contractAddress: 'abc', tokenId: '123' });
    expect(res.statusCode).toBe(200);
  });

  test('POST / should return 500 if the contractAddress and tokenId are not specified', async () => {
    const nftMeta = createNFTMetaData();
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    const res = await request(app).post('/');
    expect(res.statusCode).toBe(500);
  });

  test('POST / should return empty metadata if data doesnt exist', async () => {
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue({});
    const res = await request(app).post('/').type('json').send({ contractAddress: 'abc', tokenId: '123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.image).toBe('');
    expect(res.body.name).toBe('');
    expect(res.body.name).toBe('');
  });
});
