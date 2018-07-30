import config from '../../config';
import path from 'path';

export function sendHtmlFile(req, res) {
    return res.sendFile(path.join(__dirname, `../${config.static}/index.html`));
}
