import express from 'express';
import config from '../config';
import log from './libs/logger';
import dbConnection from './libs/mongoose';
import bodyParser from 'body-parser';
import userApi from './routers/user';
import groupApi from './routers/group';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(userApi);
app.use(groupApi);

app.use((err, req, res, next) => res.status(err.status ? err.status : 500).json(err));


dbConnection.once('open', function () {
    app.listen(config.port, function () {
        log.info(`Server listening on port ${config.port}!`);
    });
});