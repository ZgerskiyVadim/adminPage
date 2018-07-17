import { call, put, takeEvery } from 'redux-saga/effects';
import UsersAPI from '../api/usersAPI';
import * as actions from '../actions/constants';

function* callgetUsers() {
    try {
        const users = yield call(UsersAPI.getUsers);
        yield put({type: actions.GET_USERS, payload: users});
    } catch (e) {
        yield put({type: actions.USERS_REQUEST_FAILED, message: e.message});
    }
}

function* callsearchUsers(action) {
    try {
        const users = yield call(UsersAPI.searchUsers, action.payload);
        yield put({type: actions.GET_USERS, payload: users});
    } catch (e) {
        yield put({type: actions.USERS_REQUEST_FAILED, message: e.message});
    }
}


export default function* usersSaga() {
    yield [
        takeEvery(actions.GET_USERS_REQUEST, callgetUsers),
        takeEvery(actions.SEARCH_USERS_REQUEST, callsearchUsers)
    ];
}