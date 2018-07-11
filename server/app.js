import express from 'express';
import path from 'path';
import config from '../config';
import { errorHandler } from './middlewares/errorHandler';
import { sendIndexHtml } from './middlewares/sendIndexHtml';
import dbConnection from './services/mongoose';
import bodyParser from 'body-parser';
import routers from './routers';
import log from "./services/logger";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, config.static)));
app.use('/api', routers);

app.get('*', sendIndexHtml);
app.use(errorHandler);


dbConnection.once('open', () => {
    app.listen(config.port, (err) => err ? log.error(err) : log.info(`Server is running on port: ${config.port}`));
});