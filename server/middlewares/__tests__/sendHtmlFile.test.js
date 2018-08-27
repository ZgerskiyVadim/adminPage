import {sendHtmlFile} from '../sendHtmlFile';
import config from '../../../config';
import path from 'path';

describe('sendHtmlFile middleware', () => {
    it('send index html file', () => {
        const res = {
            sendFile: jest.fn()
        };

        sendHtmlFile(null, res);

        const [call = []] = res.sendFile.mock.calls;
        expect(call).toEqual([path.join(__dirname, `../../${config.static}/index.html`)]);
    })
});