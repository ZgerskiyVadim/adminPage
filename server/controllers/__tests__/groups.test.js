import async from 'async';
import mongoose from 'mongoose';
import Group from '../../models/group';
import ObjectId from 'mongoose';
import fakeGroups from "../../fixtures/groups";
import fakeUsers from "../../fixtures/users";
let cookie = '';

describe('Group controller', () => {
    beforeEach(done => {
        resetDB(done);
    });

    afterEach(done => {
        dropDB(done);
    });

    afterAll(() => mongoose.disconnect());

    describe('POST', () => {
        it('user login', done => {
            const data = fakeUsers[1];

            json('post', '/auth/login')
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    cookie = result.headers['set-cookie'];
                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body.message).toEqual('User logged-in');
                    done();
                });
        });

        it('should create new group', done => {
            const data = { name: 'new-name', title: 'new-title' };

            json('post', '/api/groups', cookie)
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
            json('get', '/api/groups', cookie)
                .end(function (err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body.length).toEqual(fakeGroups.length);
                    done();
                });
        });

        it('should get 2 groups', done => {
            json('get', '/api/groups', cookie)
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

        it('should find group by group identifier', done => {
            const id = fakeGroups[1]._id;

            json('get', `/api/groups/${id}`, cookie)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body.name).toEqual(fakeGroups[1].name);
                    expect(result.body.title).toEqual(fakeGroups[1].title);
                    expect(result.body._id).toEqual(fakeGroups[1]._id.toString());
                    done();
                });
        });

        it('should return error if does not exist group', done => {
            const fakeId = new ObjectId.Types.ObjectId();

            json('get', `/api/groups/${fakeId}`, cookie)
                .end(function(err, result) {
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
            const id = fakeGroups[1]._id;

            json('patch', `/api/groups/${id}`, cookie)
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

        it('should group remove user', done => {
            const userID = fakeUsers[1]._id;
            const groupID = fakeGroups[1]._id;
            const data = {
                userID,
                groupID
            };

            const dataLeaveGroup = {
                groupID
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.body.user.groups.length).toEqual(1);
                    expect(result.body.group.users.length).toEqual(1);

                    json('patch', `/api/users/leave-group/${userID}`, cookie)
                        .send(dataLeaveGroup)
                        .end(function(err, result) {
                            if (err) throw err;

                            expect(result.statusCode).toBe(200);
                            expect(err).toBe(null);
                            expect(result.body.user.username).toEqual(fakeUsers[1].username);
                            expect(result.body.user.firstName).toEqual(fakeUsers[1].firstName);
                            expect(result.body.user.lastName).toEqual(fakeUsers[1].lastName);
                            expect(result.body.user.email).toEqual(fakeUsers[1].email);
                            expect(result.body.user._id).toEqual(fakeUsers[1]._id.toString());
                            expect(result.body.group.name).toEqual(fakeGroups[1].name);
                            expect(result.body.group.title).toEqual(fakeGroups[1].title);
                            expect(result.body.group._id).toEqual(fakeGroups[1]._id.toString());
                            expect(result.body.user.groups.length).toEqual(0);
                            expect(result.body.group.users.length).toEqual(0);
                            done();
                        });
                });
        });

        it('should return error if user trying join does not exist group', done => {
            const fakeId = new ObjectId.Types.ObjectId();
            const userID = fakeUsers[1]._id;
            const data = {
                userID,
                groupID: fakeId
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(404);
                    expect(err).toBe(null);
                    expect(result.body.message).toEqual('Group is not found');
                    done();
                });
        });

        it('should return error if not exist group remove user', done => {
            const fakeId = new ObjectId.Types.ObjectId();
            const userID = fakeUsers[1]._id;
            const groupID = fakeGroups[1]._id;
            const data = {
                userID,
                groupID
            };

            const dataLeaveGroup = {
                groupID: fakeId
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.body.user.groups.length).toEqual(1);
                    expect(result.body.group.users.length).toEqual(1);

                    json('patch', `/api/users/leave-group/${userID}`, cookie)
                        .send(dataLeaveGroup)
                        .end(function(err, result) {
                            if (err) throw err;

                            expect(result.statusCode).toBe(404);
                            expect(err).toBe(null);
                            expect(result.body.message).toEqual('Group is not found');
                            done();
                        });
                });
        });

        it('should return error if does not exist this group', done => {
            const updates = { username: 'updated-name' };
            const fakeId = new ObjectId.Types.ObjectId();

            json('patch', `/api/groups/${fakeId}`, cookie)
                .send(updates)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(404);
                    expect(err).toBe(null);
                    expect(result.body.message).toEqual('Not found!');
                    done();
                });
        });
    });

    describe('DELETE', () => {
        it('should delete group', done => {
            const id = fakeGroups[0]._id;

            async.waterfall(
                [
                    next => {
                        json('delete', `/api/groups/${id}`, cookie)
                            .end(function(err, result) {
                                if (err) throw err;

                                expect(result.statusCode).toBe(200);
                                expect(err).toBe(null);
                                expect(result.body.message).toEqual('Successfully deleted');
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

        it('should return error if does not exist this group', done => {
            const fakeId = new ObjectId.Types.ObjectId();

            json('delete', `/api/groups/${fakeId}`, cookie).end(function(err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(404);
                expect(err).toBe(null);
                expect(result.body.message).toEqual('Not found!');
                done();
            });
        });

    });

});