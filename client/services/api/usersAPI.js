import axios from 'axios/index';

    export const create = (options) => {
        return axios.post('/api/users', options)
            .then(users => users.data);
    };

    export const getUsers = (options) => {
        const { searchBy, limit} = options;
        return axios.get('/api/users', {params: {searchBy, limit}})
            .then(users => users.data);
    };

    export const getUser = (options) => {
        const { id, searchBy, limit} = options;
        return axios.get(`/api/users/${id}`, {params: {searchBy, limit}})
            .then(user => user.data);
    };

    export const updateUser = (state) => {
        const {username, firstName, lastName, email, password} = state;
        const id = state.id || state.options.id;
        return axios.patch(`/api/users/${id}`, {username, firstName, lastName, email, password})
            .then(users => users.data);
    };

    export const addUserInGroup = (options) => {
        return axios.patch(`/api/users/follow/group`, options)
            .then(updatedGroup => updatedGroup.data);
    };

    export const leaveGroup = (action) => {
        const {userID, groupID} = action;
        return axios.patch(`/api/users/leave-group/${userID}`, {groupID})
            .then(updatedGroup => updatedGroup.data);
    };

    export const removeUser = (id) => {
        return axios.delete(`/api/users/${id}`)
            .then(user => user.data);
    };
