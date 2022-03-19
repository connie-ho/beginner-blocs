import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index/index';
import nftMetaDataRouter from './routes/nft-meta-data/nft-meta-data';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/nft-meta-data', nftMetaDataRouter);
app.use('/', indexRouter);

export default app;
