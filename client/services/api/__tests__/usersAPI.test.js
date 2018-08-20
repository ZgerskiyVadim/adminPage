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

    it('should build correct request for create user', async (done) => {
        axios.post = () => Promise.resolve({ data });
        const axiosCreate = jest.spyOn(axios, 'post');

        const createdUser = await create(data);
        expect(axiosCreate).toHaveBeenCalledTimes(1);
        expect(createdUser).toBe(data);
        done();
    });

    it('should build correct request for get users', async (done) => {
        axios.get = () => Promise.resolve({ data: params });
        const axiosGetUsers = jest.spyOn(axios, 'get');

        const gotUsers = await getUsers(params);
        expect(axiosGetUsers).toHaveBeenCalledTimes(1);
        expect(gotUsers).toBe(params);
        done();
    });

    it('should build correct request for get user', async (done) => {
        const options = {...params, id: 1};
        axios.get = () => Promise.resolve({ data: options });
        const axiosGetUser = jest.spyOn(axios, 'get');

        const gotUser = await getUser(params);
        expect(axiosGetUser).toHaveBeenCalledTimes(1);
        expect(gotUser).toBe(options);
        done();
    });

    it('should build correct request for update user', async (done) => {
        const options = {...data, id: 1};
        axios.patch = () => Promise.resolve({ data: options });
        const axiosUpdateUser = jest.spyOn(axios, 'patch');

        const updatedUser = await updateUser(options);
        expect(axiosUpdateUser).toHaveBeenCalledTimes(1);
        expect(updatedUser).toBe(options);
        done();
    });

    it('should build correct request for add user in group', async (done) => {
        const options = {
            userID: 1,
            groupID: 1
        };
        axios.patch = () => Promise.resolve({ data: options });
        const axiosAddUserInGroup = jest.spyOn(axios, 'patch');

        const addedUserInGroup = await addUserInGroup(options);
        expect(axiosAddUserInGroup).toHaveBeenCalledTimes(1);
        expect(addedUserInGroup).toBe(options);
        done();
    });

    it('should build correct request for user leave group', async (done) => {
        const options = {
            userID: 1,
            groupID: 1
        };
        axios.patch = () => Promise.resolve({ data: options });
        const axiosUserLeaveGroup = jest.spyOn(axios, 'patch');

        const userLeftGroup = await leaveGroup(options);
        expect(axiosUserLeaveGroup).toHaveBeenCalledTimes(1);
        expect(userLeftGroup).toBe(options);
        done();
    });

    it('should build correct request for delete user', async (done) => {
        const id = 1;
        axios.delete = () => Promise.resolve({ data: id });
        const axiosRemoveUser = jest.spyOn(axios, 'delete');

        const removedUser = await removeUser(id);
        expect(axiosRemoveUser).toHaveBeenCalledTimes(1);
        expect(removedUser).toBe(id);
        done();
    });

});