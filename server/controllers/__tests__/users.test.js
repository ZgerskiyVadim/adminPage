import resetDB from './db';
import fakeUsers from "../../fixtures/users";

describe('User controller', () => {
    beforeEach(done => {
        resetDB(done);
    });

    describe('GET', () => {

        it('should get users', done => {
            json('get', '/api/users').end(function (err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(200);
                expect(err).toBe(null);
                expect(result.body.length).toEqual(fakeUsers.length);
                done();
            });
        });
    });

});