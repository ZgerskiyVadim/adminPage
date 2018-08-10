import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from '../../config';
import log from './logger';

mongoose.Promise = bluebird;
mongoose.connect(config.dbName, {useMongoClient: true});
const db = mongoose.connection;

db.on('error', err => log.error(`Connection error: ${err.message}`));

if (process.env.NODE_ENV !== 'test') {
    db.once('open', () => log.info('Connected to DB!'));
}

export default db;
