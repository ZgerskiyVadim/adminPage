import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as UsersAPI from '../services/api/usersAPI';
import * as types from '../actions';

function* callgetUsers(action) {
    try {
        const users = yield call(UsersAPI.getUsers, action.payload);
        yield put({type: types.GET_USERS, payload: users});
    } catch (e) {
        yield put({type: types.USERS_REQUEST_FAILED, message: e.message});
    }
}

function* callsearchUsers(action) {
    try {
        const users = yield call(UsersAPI.searchUsers, action.payload);
        yield put({type: types.GET_USERS, payload: users});
    } catch (e) {
        yield put({type: types.USERS_REQUEST_FAILED, message: e.message});
    }
}

function* callremoveUser(action) {
    try {
        const id = yield call(UsersAPI.removeUser, action.payload);
        yield put({type: types.REMOVE_USER, payload: id});
    } catch (e) {
        yield put({type: types.USER_REQUEST_FAILED, message: e.message});
    }
}


export default function* usersSaga() {
    yield all([
        takeEvery(types.GET_USERS_REQUEST, callgetUsers),
        takeEvery(types.SEARCH_USERS_REQUEST, callsearchUsers),
        takeEvery(types.REMOVE_USER_REQUEST, callremoveUser)
    ]);
}