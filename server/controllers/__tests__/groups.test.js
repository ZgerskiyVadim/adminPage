import async from 'async';
import Group from '../../models/group';
import ObjectId from 'mongoose';
import resetDB from './db';
import fakeGroups from "../../fixtures/groups";
import fakeUsers from "../../fixtures/users";


describe('Group controller', () => {
    beforeEach(done => {
        resetDB(done);
    });

    describe('POST', () => {
        it('user login', done => {
            const data = fakeUsers[0];

            json('post', '/auth/login')
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body.message).toEqual('User logged-in');
                    done();
                });
        });

        it('should create new group', done => {
            const data = { name: 'new-name', title: 'new-title' };

            json('post', '/api/groups')
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(201);
                    expect(err).toBe(null);
                    expect(result.body.title).toEqual(data.title);
                    expect(result.body.name).toEqual(data.name);
                    done();
                });
        });
    });

    describe('GET', () => {

        it('should get groups', done => {
            json('get', '/api/groups').end(function (err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(200);
                expect(err).toBe(null);
                expect(result.body.length).toEqual(fakeGroups.length);
                done();
            });
        });

        it('should get 2 groups', done => {
            json('get', '/api/groups')
                .query({
                    limit: 2
                })
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body.length).toEqual(2);
                    done();
                });
        });

        it('should find user groups by user identifier', done => {
            const id = fakeGroups[1]._id;

            json('get', `/api/groups/${id}`).end(function(err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(200);
                expect(err).toBe(null);
                expect(result.body.name).toEqual('group-name-1');
                expect(result.body.title).toEqual('group-title-1');
                done();
            });
        });

        it('should return error if does not exit group', done => {
            const fakeId = new ObjectId.Types.ObjectId();

            json('get', `/api/users/${fakeId}`).end(function(err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(404);
                expect(err).toBe(null);
                expect(result.body.message).toEqual('Not found!');
                done();
            });
        });
    });

    describe('PATCH', () => {
        it('should update group', done => {
            const updates = { name: 'updated-name' };
            const id = fakeGroups[0]._id;

            json('patch', `/api/groups/${id}`)
                .send(updates)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body._id).toEqual(id.toString());
                    expect(result.body.name).toEqual(updates.name);
                    done();
                });
        });

        // it('should return error if does not exit this user', done => {
        //     const updates = { name: 'updated-name' };
        //     const fakeId = fakeUsers[0]._id;
        //     json('patch', `/api/groups/${fakeId}`)
        //         .send(updates)
        //         .end(function(err, result) {
        //             if (err) throw err;
        //
        //             expect(result.statusCode).toBe(404);
        //             expect(err).toBe(null);
        //             expect(result.body.error.message).toBe('This group is not exist.');
        //             done();
        //         });
        // });
    });

    describe('DELETE', () => {
        it('should delete group', done => {
            const id = fakeGroups[0]._id;

            async.waterfall(
                [
                    next => {
                        json('delete', `/api/groups/${id}`).end(function(err, result) {
                            if (err) throw err;

                            expect(result.statusCode).toBe(200);
                            expect(err).toBe(null);
                            expect(result.body).toEqual('Successfully deleted');
                            next();
                        });
                    },
                    next => Group.find(next)
                ],
                (err, groups) => {
                    if (err) {
                        return done(err);
                    }
                    expect(groups.length).not.toEqual(fakeGroups.length);
                    done();
                }
            );
        });

        // it('should return error if does not exit this group', done => {
        //     const fakeId = fakeUsers[0]._id;
        //
        //     json('delete', `/api/groups/${fakeId}`).end(function(err, result) {
        //         if (err) throw err;
        //
        //         expect(result.statusCode).toBe(404);
        //         expect(err).toBe(null);
        //         expect(result.body.error.message).toEqual('This group is not exist.');
        //         done();
        //     });
        // });

    });

});