import axios from 'axios/index';

    export const create = (options) => {
        return axios.post('/api/groups', options)
            .then(groups => groups.data);
    };

    export const getGroups = (limit) => {
        return axios.get('/api/groups', {params: {limit}})
            .then(groups => groups.data);
    };

    export const getGroup = (options) => {
        const { id, searchBy, limit} = options;
        return axios.get(`/api/groups/${id}`, {params: { searchBy, limit }})
            .then(group => group.data);
    };

    export const searchGroups = (options) => {
        const { searchBy, limit } = options;
        return axios.get('/api/groups', {params: { searchBy, limit }})
            .then(groups => groups.data);
    };

    export const updateGroup = (options) => {
        return axios.patch(`/api/groups/${options.id}`, options)
            .then(groups => groups.data);
    };

    export const removeUserFromGroup = (action) => {
        const {userID, groupID} = action;
        return axios.patch(`/api/groups/remove-user/${groupID}`, {userID})
            .then(updatedGroup => updatedGroup.data);
    };

    export const removeGroup = (id) => {
        return axios.delete(`/api/groups/${id}`)
            .then(group => id);
    };
