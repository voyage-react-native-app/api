import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import http from 'http';

import userRouter from './controller/user.controller.js';
import errorHandler from './_helpers/err-handler.js';
import connectToDb from './_helpers/db.js';

dotenv.config();

// keys and certificate for https server
const key = fs.readFileSync('./https-keys/key.pem');
const cert = fs.readFileSync('./https-keys/cert.pem');

const app = express();

// middleware
app.use(cors({
    credentials: true,
    origin: process.env.WEBUI_URL
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// routes
app.use('/users', userRouter);

// global error handler
app.use(errorHandler);

// DB connection
connectToDb();

const HTTP_PORT = process.env.NODE_ENV === 'dev' ? process.env.HTTP_DEV_PORT : 80;
const HTTPS_PORT = process.env.NODE_ENV === 'dev' ? process.env.HTTPS_DEV_PORT : 443;

http.createServer(app)
    .listen(HTTP_PORT, () => console.log('HTTP listening on: ', + HTTP_PORT));

https.createServer({
        key: key,
        cert: cert
    }, app)
    .listen(HTTPS_PORT, () => console.log('HTTPS listening on: ', + HTTPS_PORT));

