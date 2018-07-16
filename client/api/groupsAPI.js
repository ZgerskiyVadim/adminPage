import axios from "axios/index";

export default class GroupsAPI {

    static getGroups() {
        return axios.get('/api/groups')
            .then(groups => groups.data)
            .catch(err => err)
    }

    static removeGroup(id) {
        return axios.delete(`/api/groups/${id}`)
            .then(group => id)
            .catch(err => err)
    }
}