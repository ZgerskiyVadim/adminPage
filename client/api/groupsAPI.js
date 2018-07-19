import axios from "axios/index";

export default class GroupsAPI {

    static getGroups(limit) {
        return axios.get('/api/groups', {params: {limit}})
            .then(groups => groups.data)
            .catch(err => err)
    }

    static getGroup(id) {
        return axios.get(`/api/groups/${id}`)
            .then(group => group.data)
            .catch(err => err);
    }

    static searchGroups(options) {
        const { searchBy, limit } = options;
        return axios.get('/api/groups', {
            params: {
                searchBy,
                limit
            }
        })
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
            .then(updatedGroup => userID)
            .catch(err => err);
    }

    static removeGroup(id) {
        return axios.delete(`/api/groups/${id}`)
            .then(group => id)
            .catch(err => err)
    }
}