import mongoose from 'mongoose';
import config from '../../../config';
import log from '../logger';

mongoose.connect(config.dbName, {useMongoClient: true});
const db = mongoose.connection;

db.on('error', err => log.error(`Connection error: ${err.message}`));

db.once('open', () => log.info('Connected to DB!'));

export default db;