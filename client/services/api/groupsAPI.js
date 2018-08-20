import axios from 'axios/index';

    export const create = (options) => {
        return axios.post('/api/groups', options)
    };

    export const getGroups = (options) => {
        const { searchBy, limit } = options;
        return axios.get('/api/groups', {params: { searchBy, limit }})
    };

    export const getGroup = (options) => {
        const { id, searchBy, limit} = options;
        return axios.get(`/api/groups/${id}`, {params: { searchBy, limit }})
    };

    export const updateGroup = (state) => {
        const {name, title} = state;
        const id = state.id || state.options.id;
        return axios.patch(`/api/groups/${id}`, {name, title})
    };

    export const removeUserFromGroup = (action) => {
        const {userID, groupID} = action;
        return axios.patch(`/api/groups/remove-user/${groupID}`, {userID})
    };

    export const removeGroup = (id) => {
        return axios.delete(`/api/groups/${id}`)
    };
