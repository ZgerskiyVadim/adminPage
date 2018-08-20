import axios from 'axios/index';
import {
    create,
    getUsers,
    getUser,
    updateUser,
    addUserInGroup,
    leaveGroup,
    removeUser
} from '../usersAPI';

const data = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password'
};

const params = {
    searchBy: '',
    limit: 20
};

describe('Users API service', () => {

    it('should build correct request for create user', (done) => {
        axios.post = () => Promise.resolve({ data });
        const axiosCreate = jest.spyOn(axios, 'post');

        create(data).then(result => {
            const [[url, params]] = axiosCreate.mock.calls;
            expect(result.data).toEqual(data);
            expect(axiosCreate).toHaveBeenCalledTimes(1);
            expect(url).toBe('/api/users');
            expect(params).toEqual(data);
            done();
        }).catch(done);
    });

    it('should build correct request for get users', (done) => {
        axios.get = () => Promise.resolve({ data: params });
        const axiosGetUsers = jest.spyOn(axios, 'get');

        getUsers(params).then(result => {
            const [[url, params]] = axiosGetUsers.mock.calls;
            expect(result.data).toEqual(params.params);
            expect(axiosGetUsers).toHaveBeenCalledTimes(1);
            expect(url).toBe('/api/users');
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for get user', (done) => {
        const options = {...params, id: 1};
        axios.get = () => Promise.resolve({ data: params });
        const axiosGetUser = jest.spyOn(axios, 'get');

        getUser(options).then(result => {
            const [[url, params]] = axiosGetUser.mock.calls;
            expect(result.data).toEqual(params.params);
            expect(axiosGetUser).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/users/${options.id}`);
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for update user', (done) => {
        const options = {...data, id: 1};
        axios.patch = () => Promise.resolve({ data });
        const axiosUpdateUser = jest.spyOn(axios, 'patch');

        updateUser(options).then(result => {
            const [[url, params]] = axiosUpdateUser.mock.calls;
            expect(result.data).toEqual(params);
            expect(axiosUpdateUser).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/users/${options.id}`);
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for add user in group', (done) => {
        const options = {
            userID: 1,
            groupID: 1
        };
        axios.patch = () => Promise.resolve({ data: options });
        const axiosAddUserInGroup = jest.spyOn(axios, 'patch');

        addUserInGroup(options).then(result => {
            const [[url, params]] = axiosAddUserInGroup.mock.calls;
            expect(result.data).toEqual(params);
            expect(axiosAddUserInGroup).toHaveBeenCalledTimes(1);
            expect(url).toBe('/api/users/follow/group');
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for user leave group', (done) => {
        const options = {
            userID: 1,
            groupID: 1
        };
        const expectedParams = {groupID: 1};

        axios.patch = () => Promise.resolve({ data: expectedParams });
        const axiosUserLeaveGroup = jest.spyOn(axios, 'patch');

        leaveGroup(options).then(result => {
            const [[url, params]] = axiosUserLeaveGroup.mock.calls;
            expect(result.data).toEqual(params);
            expect(axiosUserLeaveGroup).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/users/leave-group/${options.userID}`);
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for delete user', (done) => {
        const id = 1;
        axios.delete = () => Promise.resolve();
        const axiosRemoveUser = jest.spyOn(axios, 'delete');

        removeUser(id).then(() => {
            const [[url]] = axiosRemoveUser.mock.calls;
            expect(axiosRemoveUser).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/users/${id}`);
            done();
        }).catch(done);
    });

});