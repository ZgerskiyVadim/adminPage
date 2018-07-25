import axios from "axios/index";

    export const create = (options) => {
        return axios.post('/api/users', options)
            .then(users => users.data)
    };

    export const getUsers = (limit) => {
        return axios.get('/api/users', {params: { limit }})
            .then(users => users.data)
    };

    export const getUser = (id) => {
        return axios.get(`/api/users/${id}`)
            .then(user => user.data)
    };

    export const searchUsers = (options) => {
        const { searchBy, limit} = options;
        return axios.get('/api/users', {params: { searchBy, limit }})
            .then(users => users.data)
    };

    export const updateUser = (options) => {
        return axios.patch(`/api/users/${options.id}`, options)
            .then(users => users.data)
    };

    export const addUserInGroup = (options) => {
        return axios.put(`/api/users/add-user-in-group`, options)
            .then(updatedGroup => updatedGroup.data)
    };

    export const leaveGroup = (action) => {
        const {userID, groupID} = action;
        return axios.put(`/api/users/leave-group/${userID}`, {groupID})
            .then(updatedGroup => updatedGroup.data)
    };

    export const removeUser = (id) => {
        return axios.delete(`/api/users/${id}`)
            .then(user => id)
    };