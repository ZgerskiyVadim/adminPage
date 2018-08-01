import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import config from '../config';
import { errorHandler } from './middlewares/errorHandler';
import { sendHtmlFile } from './middlewares/sendHtmlFile';
import { runServer } from './middlewares/runServer';
import dbConnection from './services/mongoose';
import routers from './routers';

const app = express();

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, config.favicon)));
app.use('/api', routers);
app.use(errorHandler);

app.get('*', sendHtmlFile);

dbConnection.once('open', runServer);

export default app;
