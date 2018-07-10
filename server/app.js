import express from 'express';
import path from 'path';
import config from '../config';
import * as common from './middlewares/common';
import dbConnection from './libs/mongoose';
import bodyParser from 'body-parser';
import userApi from './routers/user';
import groupApi from './routers/group';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, config.static)));
app.use(userApi);
app.use(groupApi);

app.use(common.errorHandler);


dbConnection.once('open', () => {
    app.listen(config.port, common.listen);
});