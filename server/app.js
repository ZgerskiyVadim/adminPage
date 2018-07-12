import express from 'express';
import path from 'path';
import config from '../config';
import { errorHandler } from './middlewares/errorHandler';
import { sendErrorHtml } from './middlewares/sendErrorHtml';
import dbConnection from './services/mongoose';
import bodyParser from 'body-parser';
import routers from './routers';
import log from "./services/logger";
import webpack from 'webpack';
import webpackMiddleware from './middlewares/webpackMiddleware';
import webpackConfig from '../webpack.config.js';

const app = express();

const compiler = webpack(webpackConfig);
webpackMiddleware(app, compiler, webpackConfig);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, config.static)));
app.use('/api', routers);

app.get('*', sendErrorHtml);
app.use(errorHandler);


dbConnection.once('open', () => {
    app.listen(config.port, (err) => err ? log.error(err) : log.info(`Server is running on port: ${config.port}`));
});