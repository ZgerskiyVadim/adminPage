import errorHandler from '../errorHandler';

describe('errorHandler middleware:', () => {

    it('should handle error when pass error', () => {
        const error = {
            status: 404,
            message: 'Not found'
        };
        const req = {};
        const res = {
            status: function(status) {
                return {
                    json: function (err) {
                        expect(err.status).toEqual(error.status);
                        expect(err.message).toEqual(error.message);
                    }
                }
            }
        };
        // res.status(err.status).json(err)

        // const errorHandle = errorHandler();

    });

});