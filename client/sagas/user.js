import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as UsersAPI from '../services/api/usersAPI';
import {
    GET_USER,
    USER_REQUEST_FAILED,
    UPDATE_USER,
    UPDATE_GROUP,
    USER_UPDATE_GROUPS,
    GET_USER_REQUEST,
    UPDATE_USER_REQUEST,
    ADD_USER_IN_GROUP_REQUEST,
    LEAVE_GROUP_REQUEST,
} from '../actions';

function* callgetUser(action) {
    try {
        const user = yield call(UsersAPI.getUser, action.payload);
        yield put({type: GET_USER, payload: user});
    } catch (e) {
        yield put({type: USER_REQUEST_FAILED, message: e.message});
    }
}

function* callupdateUser(action) {
    try {
        const user = yield call(UsersAPI.updateUser, action.payload);
        yield put({type: UPDATE_USER, payload: user});
    } catch (e) {
        yield put({type: USER_REQUEST_FAILED, message: e.message});
    }
}

function* calladdUserInGroup(action) {
    try {
        const updatedGroup = yield call(UsersAPI.addUserInGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: updatedGroup});
    } catch (e) {
        yield put({type: USER_REQUEST_FAILED, message: e.message});
    }
}

function* callLeaveGroup(action) {
    try {
        const updatedGroup = yield call(UsersAPI.leaveGroup, action.payload);
        yield put({type: USER_UPDATE_GROUPS, payload: updatedGroup});
        yield put({type: UPDATE_GROUP, payload: updatedGroup});
    } catch (e) {
        yield put({type: USER_REQUEST_FAILED, message: e.message});
    }
}


export default function* userSaga() {
    yield all([
        takeEvery(GET_USER_REQUEST, callgetUser),
        takeEvery(UPDATE_USER_REQUEST, callupdateUser),
        takeEvery(ADD_USER_IN_GROUP_REQUEST, calladdUserInGroup),
        takeEvery(LEAVE_GROUP_REQUEST, callLeaveGroup)
    ]);
}