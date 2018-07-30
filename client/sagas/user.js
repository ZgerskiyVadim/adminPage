import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as usersAPI from '../services/api/usersAPI';
import {
    GET_USER,
    USER_REQUEST_FAILED,
    UPDATE_USER,
    UPDATE_GROUP,
    USER_LEAVE_GROUP,
    GET_USER_REQUEST,
    UPDATE_USER_REQUEST,
    ADD_USER_IN_GROUP_REQUEST,
    LEAVE_GROUP_REQUEST,
    USERS_REQUEST_FAILED,
    GROUPS_REQUEST_FAILED
} from '../actions';

function* callgetUser(action) {
    try {
        const user = yield call(usersAPI.getUser, action.payload);
        yield put({type: GET_USER, payload: user});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
    }
}

function* callupdateUser(action) {
    try {
        const user = yield call(usersAPI.updateUser, action.payload);
        yield put({type: UPDATE_USER, payload: user});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
        yield put({type: USERS_REQUEST_FAILED, payload: error});
    }
}

function* calladdUserInGroup(action) {
    try {
        const updatedGroup = yield call(usersAPI.addUserInGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: updatedGroup});
    } catch (error) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* callLeaveGroup(action) {
    try {
        const updatedGroup = yield call(usersAPI.leaveGroup, action.payload);
        yield put({type: USER_LEAVE_GROUP, payload: updatedGroup});
        yield put({type: UPDATE_GROUP, payload: updatedGroup});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
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
