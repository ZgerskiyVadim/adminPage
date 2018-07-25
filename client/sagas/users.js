import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as usersAPI from '../services/api/usersAPI';
import {
    GET_USERS,
    GET_USERS_REQUEST,
    SEARCH_USERS_REQUEST,
    REMOVE_USER,
    REMOVE_USER_REQUEST,
    USERS_REQUEST_FAILED,
} from '../actions';

function* callgetUsers(action) {
    try {
        const users = yield call(usersAPI.getUsers, action.payload);
        yield put({type: GET_USERS, payload: users});
    } catch (e) {
        yield put({type: USERS_REQUEST_FAILED, payload: e.message});
    }
}

function* callsearchUsers(action) {
    try {
        const users = yield call(usersAPI.searchUsers, action.payload);
        yield put({type: GET_USERS, payload: users});
    } catch (e) {
        yield put({type: USERS_REQUEST_FAILED, payload: e.message});
    }
}

function* callremoveUser(action) {
    try {
        const id = yield call(usersAPI.removeUser, action.payload);
        yield put({type: REMOVE_USER, payload: id});
    } catch (e) {
        yield put({type: USERS_REQUEST_FAILED, payload: e.message});
    }
}


export default function* usersSaga() {
    yield all([
        takeEvery(GET_USERS_REQUEST, callgetUsers),
        takeEvery(SEARCH_USERS_REQUEST, callsearchUsers),
        takeEvery(REMOVE_USER_REQUEST, callremoveUser)
    ]);
}