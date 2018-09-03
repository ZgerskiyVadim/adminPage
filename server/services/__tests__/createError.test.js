import createError from '../createError';

describe('createError service:', () => {

    it('should handle error', () => {
        const status = 404;
        const message = 'Not found';

        const error = createError(message, status);
        expect(error.status).toEqual(status);
        expect(error.message).toEqual(message);
    });

    it('should handle error without arguments', () => {
        const error = createError();
        expect(error.status).toEqual(500);
        expect(error.message).toEqual('Server Error');
    });

});