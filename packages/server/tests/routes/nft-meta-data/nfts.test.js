import * as nftMetaDataProviders from '../../../src/lib/nft-meta-data.provider';
import * as nftProviders from '../../../src/lib/nft-provider';

import { createNFTMetaData, createNFTs } from '../../helpers';
import request from 'supertest';
import express from 'express';
import router from '../../../src/routes/nfts/nfts';
import axios from 'axios';

let app = null;
app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
jest.mock('axios');

describe('get-nfts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /owned/ should return a successful response', async () => {
    const ownedNFTs = createNFTs();
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockResolvedValue(ownedNFTs);
    const res = await request(app).get('/owned/123').type('json');
    expect(res.statusCode).toBe(200);
  });

  test('GET /owned/ should return status code 404 with an undefined owner address', async () => {
    const ownedNFTs = createNFTs();
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockResolvedValue(ownedNFTs);
    const res = await request(app).get('/owned/undefined').type('json');
    expect(res.statusCode).toBe(404);
  });

  test('GET /owned/ should return an empty array if no data was received', async () => {
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockResolvedValue({});
    const res = await request(app).get('/owned/123').type('json');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.ownedNfts).toStrictEqual([]);
  });

  test('Returns status 500 with rejected promise', async () => {
    jest.spyOn(nftProviders, 'fetchOwnedNFTs').mockRejectedValueOnce(new Error('Error'));
    const res = await request(app).get('/owned/123').type('json');
    expect(res.statusCode).toBe(500);
  });
});

describe('nft-meta-data', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST / should return the meta data', async () => {
    const nftMeta = createNFTMetaData();
    const meta = {
      data: {
        metadata: {
          image: 'image.png',
          name: 'Test',
          description: 'I am a test NFT',
        },
      },
    };
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue(nftMeta);
    jest.spyOn(axios, 'get').mockResolvedValue(meta);

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
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockResolvedValue({
      data: {
        metadata: {
          metadata: [],
        },
        tokenUri: {
          gateway: 'https://gatewadsa.com',
        },
      },
    });
    const emptyMeta = {
      data: {
        image: '',
        name: '',
        description: '',
      },
    };
    jest.spyOn(axios, 'get').mockResolvedValue(emptyMeta);
    const res = await request(app).post('/meta-data').type('json').send({ contractAddress: 'abc', tokenId: '123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.image).toBe('');
    expect(res.body.name).toBe('');
    expect(res.body.name).toBe('');
  });

  test('Returns status 500 with rejected promise', async () => {
    jest.spyOn(nftMetaDataProviders, 'fetchMetaDataAlchemy').mockRejectedValue(new Error('Error'));
    const res = await request(app).post('/meta-data').type('json').send({ contractAddress: 'abc', tokenId: '123' });
    expect(res.statusCode).toBe(500);
  });
});
