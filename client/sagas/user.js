import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as UsersAPI from '../services/api/usersAPI';
import * as types from '../actions';

function* callgetUser(action) {
    try {
        const user = yield call(UsersAPI.getUser, action.payload);
        yield put({type: types.GET_USER, payload: user});
    } catch (e) {
        yield put({type: types.USER_REQUEST_FAILED, message: e.message});
    }
}

function* callupdateUser(action) {
    try {
        const user = yield call(UsersAPI.updateUser, action.payload);
        yield put({type: types.UPDATE_USER, payload: user});
    } catch (e) {
        yield put({type: types.USER_REQUEST_FAILED, message: e.message});
    }
}

function* calladdUserInGroup(action) {
    try {
        const updatedGroup = yield call(UsersAPI.addUserInGroup, action.payload);
        yield put({type: types.UPDATE_GROUP, payload: updatedGroup});
    } catch (e) {
        yield put({type: types.USER_REQUEST_FAILED, message: e.message});
    }
}

function* callLeaveGroup(action) {
    try {
        const updatedGroup = yield call(UsersAPI.leaveGroup, action.payload);
        yield put({type: types.USER_UPDATE_GROUPS, payload: updatedGroup});
        yield put({type: types.UPDATE_GROUP, payload: updatedGroup});
    } catch (e) {
        yield put({type: types.USER_REQUEST_FAILED, message: e.message});
    }
}


export default function* userSaga() {
    yield all([
        takeEvery(types.GET_USER_REQUEST, callgetUser),
        takeEvery(types.UPDATE_USER_REQUEST, callupdateUser),
        takeEvery(types.ADD_USER_IN_GROUP_REQUEST, calladdUserInGroup),
        takeEvery(types.LEAVE_GROUP_REQUEST, callLeaveGroup)
    ]);
}