import axios from 'axios/index';
import {
    create,
    getGroup,
    getGroups,
    updateGroup,
    removeUserFromGroup,
    removeGroup
} from '../groupsAPI';

const data = {
    name: 'name',
    title: 'title'
};

const params = {
    searchBy: '',
    limit: 20
};

describe('Groups API service', () => {

    it('should build correct request for create group', async (done) => {
        axios.post = () => Promise.resolve({ data });
        const axiosCreate = jest.spyOn(axios, 'post');

        const createdGroup = await create(data);
        expect(axiosCreate).toHaveBeenCalledTimes(1);
        expect(createdGroup).toBe(data);
        done();
    });

    it('should build correct request for get groups', async (done) => {
        axios.get = () => Promise.resolve({ data: params });
        const axiosGetGroups = jest.spyOn(axios, 'get');

        const gotGroups = await getGroups(params);
        expect(axiosGetGroups).toHaveBeenCalledTimes(1);
        expect(gotGroups).toBe(params);
        done();
    });

    it('should build correct request for get group', async (done) => {
        const options = {...params, id: 1};
        axios.get = () => Promise.resolve({ data: options });
        const axiosGetGroup = jest.spyOn(axios, 'get');

        const gotGroup = await getGroup(params);
        expect(axiosGetGroup).toHaveBeenCalledTimes(1);
        expect(gotGroup).toBe(options);
        done();
    });

    it('should build correct request for update group', async (done) => {
        const options = {...data, id: 1};
        axios.patch = () => Promise.resolve({ data: options });
        const axiosUpdateGroup = jest.spyOn(axios, 'patch');

        const updatedGroup = await updateGroup(options);
        expect(axiosUpdateGroup).toHaveBeenCalledTimes(1);
        expect(updatedGroup).toBe(options);
        done();
    });

    it('should build correct request for remove user from group', async (done) => {
        const options = {
            userID: 1,
            groupID: 1
        };
        axios.patch = () => Promise.resolve({ data: options });
        const axiosRemoveUserFromGroup = jest.spyOn(axios, 'patch');

        const removedUserFromGroup = await removeUserFromGroup(options);
        expect(axiosRemoveUserFromGroup).toHaveBeenCalledTimes(1);
        expect(removedUserFromGroup).toBe(options);
        done();
    });

    it('should build correct request for delete group', async (done) => {
        const id = 1;
        axios.delete = () => Promise.resolve({ data: id });
        const axiosRemoveGroup = jest.spyOn(axios, 'delete');

        const removedGroup = await removeGroup(id);
        expect(axiosRemoveGroup).toHaveBeenCalledTimes(1);
        expect(removedGroup).toBe(id);
        done();
    });

});