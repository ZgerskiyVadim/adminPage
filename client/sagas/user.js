import { call, put, takeEvery, all } from 'redux-saga/effects';
import UsersAPI from '../api/usersAPI';
import * as actions from '../actions/constants';

function* callgetUser(action) {
    try {
        const user = yield call(UsersAPI.getUser, action.payload);
        yield put({type: actions.GET_USER, payload: user});
    } catch (e) {
        yield put({type: actions.USER_REQUEST_FAILED, message: e.message});
    }
}

function* callleaveGroup(action) {
    try {
        const groups = yield call(UsersAPI.leaveGroup, action.payload);
        yield put({type: actions.USER_UPDATE_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: actions.USER_REQUEST_FAILED, message: e.message});
    }
}


export default function* userSaga() {
    yield all([
        takeEvery(actions.GET_USER_REQUEST, callgetUser),
        takeEvery(actions.LEAVE_GROUP_REQUEST, callleaveGroup)
    ]);
}