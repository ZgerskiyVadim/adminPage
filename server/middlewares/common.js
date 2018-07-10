import config from '../../config';
import log from '../libs/logger';

export function listen(err) {
    return err
        ? log.error(err)
        : log.info(`Server is running on port: ${config.port}`);
}

export function errorHandler(err, req, res, next) {
    return res.status(err.status ? err.status : 500).json(err);
}