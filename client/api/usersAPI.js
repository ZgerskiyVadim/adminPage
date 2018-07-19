import axios from "axios/index";

export default class UsersAPI {

    static getUsers(limit) {
        return axios.get('/api/users', {params: { limit }})
            .then(users => users.data)
            .catch(err => err)
    }

    static getUser(id) {
        return axios.get(`/api/users/${id}`)
            .then(user => user.data)
            .catch(err => err);
    }

    static searchUsers(query) {
        return axios.get('/api/users', {params: {searchBy: query}})
            .then(users => users.data)
            .catch(err => err);
    }

    static updateUser(options) {
        return axios.patch(`/api/users/${options.id}`, options)
            .then(users => users.data)
            .catch(err => err);
    }

    static addUserInGroup(options) {
        return axios.put(`/api/users/add-user-in-group`, options)
            .then(updatedGroup => updatedGroup.data)
            .catch(err => err);
    }

    static leaveGroup(action) {
        const {userID, groupID} = action;
        return axios.put(`/api/users/leave-group/${userID}`, {groupID})
            .then(updatedGroup => updatedGroup.data)
            .catch(err => err);
    }

    static removeUser(id) {
        return axios.delete(`/api/users/${id}`)
            .then(user => id)
            .catch(err => err)
    }
}