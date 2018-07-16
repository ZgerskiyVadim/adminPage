import { call, put, takeEvery } from 'redux-saga/effects';
import UsersAPI from '../api/usersAPI';

function* callgetUsers() {
    try {
        const users = yield call(UsersAPI.getUsers);
        yield put({type: "GET_USERS", payload: users});
    } catch (e) {
        yield put({type: "GET_USERS_REQUEST_FAILED", message: e.message});
    }
}

function* callsearchUsers(action) {
    try {
        const users = yield call(UsersAPI.searchUsers, action.payload);
        yield put({type: "GET_USERS", payload: users});
    } catch (e) {
        yield put({type: "GET_USERS_REQUEST_FAILED", message: e.message});
    }
}

function* callremoveUser(action) {
    try {
        const id = yield call(UsersAPI.removeUser, action.payload);
        yield put({type: "REMOVE_USER", payload: id});
    } catch (e) {
        yield put({type: "REMOVE_USER_REQUEST_FAILED", message: e.message});
    }
}


export function* getUsers() {
    yield takeEvery('GET_USERS_REQUEST', callgetUsers);
}

export function* searchUsers() {
    yield takeEvery('SEARCH_USERS_REQUEST', callsearchUsers);
}

export function* removeUser() {
    yield takeEvery('REMOVE_USER_REQUEST', callremoveUser);
}