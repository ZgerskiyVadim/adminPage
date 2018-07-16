import axios from "axios/index";

export default class UsersAPI {

    static getUsers() {
        return axios.get('/api/users')
            .then(users => users.data)
            .catch(err => err)
    }

    static searchUsers(query) {
        console.log('query', query);
        return []
    }

    static removeUser(id) {
        return axios.delete(`/api/users/${id}`)
            .then(user => id)
            .catch(err => err)
    }
}