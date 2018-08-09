import app from '../app';
import config from '../../config';
import log from '../services/logger';

export function runServer() {
    if (process.env.NODE_ENV !== 'test') {
        return app.listen(config.port, (err) => err ? log.error(err) : log.info(`Server is running on port: ${config.port}`));
    }
}
