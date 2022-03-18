import * as nftMetaDataProviders from '../../../src/routes/nfts/providers/nft-meta-data.provider';
import * as nftProviders from '../../../src/routes/nfts/providers/nft-provider';

import { createNFTMetaData, createNFTs } from '../../helpers';
import request from 'supertest';
import express from 'express';
import router from '../../../src/routes/nfts/nfts';

let app = null;
app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

describe('get-nfts', () => {
  test('GET /owned/ should return a successful response', async () => {
    const ownedNFTs = createNFTs();
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockResolvedValue(ownedNFTs);
    const res = await request(app).get('/owned/123').type('json');
    expect(res.statusCode).toBe(200);
  });

  test('GET /owned/ should return status code 404 with an undefined owner address', async () => {
    const ownedNFTs = createNFTs();
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockResolvedValue(ownedNFTs);
    const res = await request(app).get('/owned').type('json');
    expect(res.statusCode).toBe(404);
  });

  test('GET /owned/ should return an empty array if no data was received', async () => {
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockResolvedValue({});
    const res = await request(app).get('/owned/123').type('json');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.ownedNfts).toStrictEqual([]);
  });
});

describe('nft-meta-data', () => {
  test('POST / should return the meta data', async () => {
    const nftMeta = createNFTMetaData();
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    const res = await request(app).post('/meta-data').type('json').send({ contractAddress: 'abc', tokenId: '123' });
    expect(res.statusCode).toBe(200);
  });

  test('POST / should return 500 if the contractAddress and tokenId are not specified', async () => {
    const nftMeta = createNFTMetaData();
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    const res = await request(app).post('/meta-data');
    expect(res.statusCode).toBe(500);
  });

  test('POST / should return empty metadata if data doesnt exist', async () => {
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue({});
    const res = await request(app).post('/meta-data').type('json').send({ contractAddress: 'abc', tokenId: '123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.image).toBe('');
    expect(res.body.name).toBe('');
    expect(res.body.name).toBe('');
  });
});
