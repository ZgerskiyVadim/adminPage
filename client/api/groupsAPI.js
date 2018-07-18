import axios from "axios/index";

export default class GroupsAPI {

    static getGroups() {
        return axios.get('/api/groups')
            .then(groups => groups.data)
            .catch(err => err)
    }

    static getGroup(id) {
        return axios.get(`/api/groups/${id}`)
            .then(group => group.data)
            .catch(err => err);
    }

    static searchGroups(query) {
        return axios.get('/api/groups', {params: {searchBy: query}})
            .then(groups => groups.data)
            .catch(err => err);
    }

    static updateGroup(options) {
        return axios.patch(`/api/groups/${options.id}`, options)
            .then(groups => groups.data)
            .catch(err => err);
    }

    static removeUserFromGroup(action) {
        const {userID, groupID} = action;
        return axios.put(`/api/groups/remove-user/${groupID}`, {userID})
            .then(groups => userID)
            .catch(err => err);
    }

    static removeGroup(id) {
        return axios.delete(`/api/groups/${id}`)
            .then(group => id)
            .catch(err => err)
    }
}