import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function requestGetUsers() {
    return axios.get('/api/users')
        .then(users => users.data)
        .catch(err => err)
}

function* callgetUsers() {
    try {
        const users = yield call(requestGetUsers);
        yield put({type: "GET_USERS", payload: users});
    } catch (e) {
        yield put({type: "GET_USERS_REQUEST_FAILED", message: e.message});
    }
}


export default function* getUsers() {
    yield takeEvery('GET_USERS_REQUEST', callgetUsers);
}