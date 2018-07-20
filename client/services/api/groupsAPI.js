import axios from "axios/index";

    export const getGroups = (limit) => {
        return axios.get('/api/groups', {params: {limit}})
            .then(groups => groups.data)
            .catch(err => err)
    };

    export const getGroup = (id) => {
        return axios.get(`/api/groups/${id}`)
            .then(group => group.data)
            .catch(err => err);
    };

    export const searchGroups = (options) => {
        const { searchBy, limit } = options;
        return axios.get('/api/groups', {params: { searchBy, limit }})
            .then(groups => groups.data)
            .catch(err => err);
    };

    export const updateGroup = (options) => {
        return axios.patch(`/api/groups/${options.id}`, options)
            .then(groups => groups.data)
            .catch(err => err);
    };

    export const removeUserFromGroup = (action) => {
        const {userID, groupID} = action;
        return axios.put(`/api/groups/remove-user/${groupID}`, {userID})
            .then(updatedGroup => userID)
            .catch(err => err);
    };

    export const removeGroup = (id) => {
        return axios.delete(`/api/groups/${id}`)
            .then(group => id)
            .catch(err => err)
    };