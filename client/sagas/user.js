import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as usersAPI from '../services/api/usersAPI';
import {
    GET_USER,
    USER_REQUEST_FAILED,
    UPDATE_USER,
    UPDATE_GROUP,
    USER_LEFT_GROUP,
    GET_USER_REQUEST,
    UPDATE_USER_REQUEST,
    ADD_USER_IN_GROUP_REQUEST,
    USER_JOINED_GROUP,
    LEAVE_GROUP_REQUEST,
    USERS_REQUEST_FAILED,
    GROUPS_REQUEST_FAILED
} from '../actions';

function* getUser(action) {
    try {
        const user = yield call(usersAPI.getUser, action.payload);
        yield put({type: GET_USER, payload: user});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
    }
}

function* updateUser(action) {
    try {
        const user = yield call(usersAPI.updateUser, action.payload);
        yield put({type: UPDATE_USER, payload: user});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
        yield put({type: USERS_REQUEST_FAILED, payload: error});
    }
}

function* addUserInGroup(action) {
    try {
        const updated = yield call(usersAPI.addUserInGroup, action.payload);
        yield put({type: USER_JOINED_GROUP, payload: updated.group});
        yield put({type: UPDATE_GROUP, payload: updated.group});
    } catch (error) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* leaveGroup(action) {
    try {
        const updated = yield call(usersAPI.leaveGroup, action.payload);
        yield put({type: USER_LEFT_GROUP, payload: updated.group});
        yield put({type: UPDATE_GROUP, payload: updated.group});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}


export default function* userSaga() {
    yield all([
        takeEvery(GET_USER_REQUEST, getUser),
        takeEvery(UPDATE_USER_REQUEST, updateUser),
        takeEvery(ADD_USER_IN_GROUP_REQUEST, addUserInGroup),
        takeEvery(LEAVE_GROUP_REQUEST, leaveGroup)
    ]);
}
