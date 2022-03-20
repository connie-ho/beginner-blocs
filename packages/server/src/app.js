import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRouter from './routes/index/index';
import nftRouter from './routes/nfts/nfts';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/nfts', nftRouter);
app.use('/', indexRouter);

export default app;
