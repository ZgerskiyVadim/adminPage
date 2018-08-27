import toastr from "toastr";
import showToastrMessage from '../showToastrMessage';

describe('showToastrMessage service', () => {

    it('showToastrMessage success', () => {
        toastr.success = jest.fn();
        showToastrMessage.success('message', 'title');
        const [call = []] = toastr.success.mock.calls;
        expect(call).toEqual(['message', 'title']);
    });

    it('showToastrMessage info', () => {
        toastr.info = jest.fn();
        showToastrMessage.info('info', 'title-info');
        const [call = []] = toastr.info.mock.calls;
        expect(call).toEqual(['info', 'title-info']);
    });

    it('showToastrMessage error', () => {
        toastr.error = jest.fn();
        showToastrMessage.error('error', 'title-error');
        const [call = []] = toastr.error.mock.calls;
        expect(call).toEqual(['error', 'title-error']);
    });
});