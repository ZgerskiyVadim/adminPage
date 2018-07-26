import config from '../../config';
import path from 'path';

export function sendFileHtml(req, res) {
    return res.sendFile(path.join(__dirname, `../${config.static}/index.html`));
}
