import axios from 'axios/index';

    export const create = (options) => {
        return axios.post('/api/users', options)
    };

    export const getUsers = (options) => {
        const { searchBy, limit} = options;
        return axios.get('/api/users', {params: {searchBy, limit}})
    };

    export const getUser = (options) => {
        const { id, searchBy, limit} = options;
        return axios.get(`/api/users/${id}`, {params: {searchBy, limit}})
    };

    export const updateUser = (state) => {
        const {username, firstName, lastName, email, password} = state;
        const id = state.id || state.options.id;
        return axios.patch(`/api/users/${id}`, {username, firstName, lastName, email, password})
    };

    export const addUserInGroup = (options) => {
        return axios.patch(`/api/users/follow/group`, options)
    };

    export const leaveGroup = (action) => {
        const {userID, groupID} = action;
        return axios.patch(`/api/users/leave-group/${userID}`, {groupID})
    };

    export const removeUser = (id) => {
        return axios.delete(`/api/users/${id}`)
    };
