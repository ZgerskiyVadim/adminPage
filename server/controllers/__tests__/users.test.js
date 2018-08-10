import async from 'async';
import ObjectId from 'mongoose';
import fakeUsers from "../../fixtures/users";
import fakeGroups from "../../fixtures/groups";
import User from '../../models/user';
let cookie = '';

describe('User controller', () => {
    beforeEach(done => {
        resetDB(done);
    });

    describe('POST', () => {
        it('user login', done => {
            const data = {
                username: fakeUsers[1].username,
                password: fakeUsers[1].password
            };

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

        it('should create new user', done => {
            const data = { username: 'new-name', firstName: 'new-first-name', lastName: 'lastName', email: 'new-email@email.com', password: 'new-password' };

            json('post', '/api/users', cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(201);
                    expect(err).toBe(null);
                    expect(result.body.username).toEqual(data.username);
                    expect(result.body.firstName).toEqual(data.firstName);
                    expect(result.body.lastName).toEqual(data.lastName);
                    expect(result.body.email).toEqual(data.email);
                    done();
                });
        });
    });

    describe('GET', () => {

        it('should get users', done => {
            json('get', '/api/users', cookie).end(function (err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(200);
                expect(err).toBe(null);
                expect(result.body.length).toEqual(fakeUsers.length);
                done();
            });
        });

        it('should get 2 users', done => {
            json('get', '/api/users', cookie)
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

        it('should find user by user identifier', done => {
            const id = fakeUsers[1]._id;

            json('get', `/api/users/${id}`, cookie).end(function(err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(200);
                expect(err).toBe(null);
                expect(result.body.username).toEqual(fakeUsers[1].username);
                expect(result.body.firstName).toEqual(fakeUsers[1].firstName);
                expect(result.body.lastName).toEqual(fakeUsers[1].lastName);
                expect(result.body.email).toEqual(fakeUsers[1].email);
                expect(result.body._id).toEqual(fakeUsers[1]._id.toString());
                done();
            });
        });

        it('should return error if does not exist user', done => {
            const fakeId = new ObjectId.Types.ObjectId();

            json('get', `/api/users/${fakeId}`, cookie).end(function(err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(404);
                expect(err).toBe(null);
                expect(result.body.message).toEqual('Not found!');
                done();
            });
        });
    });

    describe('PATCH', () => {
        it('should update user', done => {
            const updates = { username: 'updated-name' };
            const id = fakeUsers[1]._id;

            json('patch', `/api/users/${id}`, cookie)
                .send(updates)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body._id).toEqual(id.toString());
                    expect(result.body.username).toEqual(updates.username);
                    done();
                });
        });

        it('should user join group', done => {
            const userID = fakeUsers[1]._id;
            const groupID = fakeGroups[1]._id;
            const data = {
                userID,
                groupID
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(200);
                    expect(err).toBe(null);
                    expect(result.body.user.username).toEqual(fakeUsers[1].username);
                    expect(result.body.user.firstName).toEqual(fakeUsers[1].firstName);
                    expect(result.body.user.lastName).toEqual(fakeUsers[1].lastName);
                    expect(result.body.user.email).toEqual(fakeUsers[1].email);
                    expect(result.body.user._id).toEqual(fakeUsers[1]._id.toString());
                    expect(result.body.user.groups[0]).toEqual(fakeGroups[1]._id.toString());
                    expect(result.body.group.name).toEqual(fakeGroups[1].name);
                    expect(result.body.group.title).toEqual(fakeGroups[1].title);
                    expect(result.body.group._id).toEqual(fakeGroups[1]._id.toString());
                    expect(result.body.group.users[0]).toEqual(fakeUsers[1]._id.toString());
                    done();
                });
        });

        it('should user leave group', done => {
            const userID = fakeUsers[1]._id;
            const groupID = fakeGroups[1]._id;
            const data = {
                userID,
                groupID
            };

            const dataLeaveGroup = {
                userID
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.body.user.groups.length).toEqual(1);
                    expect(result.body.group.users.length).toEqual(1);

                    json('patch', `/api/users/leave-group/${groupID}`, cookie)
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

        it('should return error if not exist user trying join group', done => {
            const fakeId = new ObjectId.Types.ObjectId();
            const groupID = fakeGroups[1]._id;
            const data = {
                userID: fakeId,
                groupID
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.statusCode).toBe(404);
                    expect(err).toBe(null);
                    expect(result.body.message).toEqual('User is not found');
                    done();
                });
        });

        it('should return error if not exist user leave group', done => {
            const fakeId = new ObjectId.Types.ObjectId();
            const userID = fakeUsers[1]._id;
            const groupID = fakeGroups[1]._id;
            const data = {
                userID,
                groupID
            };

            const dataLeaveGroup = {
                userID: fakeId
            };

            json('patch', `/api/users/follow/group`, cookie)
                .send(data)
                .end(function(err, result) {
                    if (err) throw err;

                    expect(result.body.user.groups.length).toEqual(1);
                    expect(result.body.group.users.length).toEqual(1);

                    json('patch', `/api/users/leave-group/${groupID}`, cookie)
                        .send(dataLeaveGroup)
                        .end(function(err, result) {
                            if (err) throw err;

                            expect(result.statusCode).toBe(404);
                            expect(err).toBe(null);
                            expect(result.body.message).toEqual('User is not found');
                            done();
                        });
                });
        });

        it('should return error if does not exist this user', done => {
            const updates = { username: 'updated-name' };
            const fakeId = new ObjectId.Types.ObjectId();

            json('patch', `/api/users/${fakeId}`, cookie)
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
        it('should delete user', done => {
            const id = fakeUsers[0]._id;

            async.waterfall(
                [
                    next => {
                        json('delete', `/api/users/${id}`, cookie).end(function(err, result) {
                            if (err) throw err;

                            expect(result.statusCode).toBe(200);
                            expect(err).toBe(null);
                            expect(result.body.message).toEqual('Successfully deleted');
                            next();
                        });
                    },
                    next => User.find(next)
                ],
                (err, users) => {
                    if (err) {
                        return done(err);
                    }
                    expect(users.length).not.toEqual(fakeUsers.length);
                    done();
                }
            );
        });

        it('should return error if does not exist this user', done => {
            const fakeId = new ObjectId.Types.ObjectId();

            json('delete', `/api/users/${fakeId}`, cookie).end(function(err, result) {
                if (err) throw err;

                expect(result.statusCode).toBe(404);
                expect(err).toBe(null);
                expect(result.body.message).toEqual('Not found!');
                done();
            });
        });

    });

});