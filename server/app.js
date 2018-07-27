import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import config from '../config';
import { errorHandler } from './middlewares/errorHandler';
import { sendFileHtml } from './middlewares/sendFileHtml';
import { runServer } from './middlewares/runServer';
import dbConnection from './services/mongoose';
import routers from './routers';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, config.favicon)));
app.use('/api', routers);

app.get('*', sendFileHtml);
app.use(errorHandler);


dbConnection.once('open', runServer);

export default app;
