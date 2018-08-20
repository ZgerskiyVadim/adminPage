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

    it('should build correct request for create group', (done) => {
        axios.post = () => Promise.resolve({ data });
        const axiosCreate = jest.spyOn(axios, 'post');

        create(data).then(result => {
            const [[url, params]] = axiosCreate.mock.calls;
            expect(result.data).toEqual(data);
            expect(axiosCreate).toHaveBeenCalledTimes(1);
            expect(url).toBe('/api/groups');
            expect(params).toEqual(data);
            done();
        }).catch(done);
    });

    it('should build correct request for get groups', (done) => {
        axios.get = () => Promise.resolve({ data: params });
        const axiosGetGroups = jest.spyOn(axios, 'get');

        getGroups(params).then(result => {
            const [[url, params]] = axiosGetGroups.mock.calls;
            expect(result.data).toEqual(params.params);
            expect(axiosGetGroups).toHaveBeenCalledTimes(1);
            expect(url).toBe('/api/groups');
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for get group', (done) => {
        const options = {...params, id: 1};
        axios.get = () => Promise.resolve({ data: params });
        const axiosGetGroup = jest.spyOn(axios, 'get');

        getGroup(options).then(result => {
            const [[url, params]] = axiosGetGroup.mock.calls;
            expect(result.data).toEqual(params.params);
            expect(axiosGetGroup).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/groups/${options.id}`);
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for update group', (done) => {
        const options = {...data, id: 1};
        axios.patch = () => Promise.resolve({ data });
        const axiosUpdateGroup = jest.spyOn(axios, 'patch');

        updateGroup(options).then(result => {
            const [[url, params]] = axiosUpdateGroup.mock.calls;
            expect(result.data).toEqual(params);
            expect(axiosUpdateGroup).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/groups/${options.id}`);
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for remove user from group', (done) => {
        const options = {
            userID: 1,
            groupID: 1
        };
        const expectedParams = {userID: 1};

        axios.patch = () => Promise.resolve({ data: expectedParams });
        const axiosRemoveUserFromGroup = jest.spyOn(axios, 'patch');

        removeUserFromGroup(options).then(result => {
            const [[url, params]] = axiosRemoveUserFromGroup.mock.calls;
            expect(result.data).toEqual(params);
            expect(axiosRemoveUserFromGroup).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/groups/remove-user/${options.groupID}`);
            expect(params).toEqual(params);
            done();
        }).catch(done);
    });

    it('should build correct request for delete group', (done) => {
        const id = 1;
        axios.delete = () => Promise.resolve();
        const axiosRemoveGroup = jest.spyOn(axios, 'delete');

        removeGroup(id).then(() => {
            const [[url]] = axiosRemoveGroup.mock.calls;
            expect(axiosRemoveGroup).toHaveBeenCalledTimes(1);
            expect(url).toBe(`/api/groups/${id}`);
            done();
        }).catch(done);
    });

});