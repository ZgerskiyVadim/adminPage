import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as usersAPI from '../services/api/usersAPI';
import {
    USER_CREATED_SUCCESS,
    USER_CREATE_PENDING,
    CREATE_USER_FAIL,
    GET_USERS_SUCCESS,
    GET_USERS_PENDING,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_PENDING,
    GET_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_GROUP_SUCCESS,
    USER_LEAVE_GROUP_SUCCESS,
    GET_USER_PENDING,
    UPDATE_USER_PENDING,
    USER_JOIN_GROUP_PENDING,
    USER_JOIN_GROUP_SUCCESS,
    USER_LEAVE_GROUP_PENDING,
    UPDATE_GROUP_FAIL,
    GET_USER_FAIL,
    USER_JOIN_GROUP_FAIL,
    UPDATE_USER_FAIL,
    USER_LEAVE_GROUP_FAIL,
    GET_USERS_FAIL,
    REMOVE_USER_FAIL
} from '../actions';

function* createUser(action) {
    try {
        const user = yield call(usersAPI.create, action.payload);
        yield put({type: USER_CREATED_SUCCESS, payload: user.data});
    } catch (error) {
        yield put({type: CREATE_USER_FAIL, payload: error});
    }
}

function* getUsers(action) {
    try {
        const users = yield call(usersAPI.getUsers, action.payload);
        yield put({type: GET_USERS_SUCCESS, payload: users.data});
    } catch (error) {
        yield put({type: GET_USERS_FAIL, payload: error});
    }
}

function* removeUser(action) {
    try {
        const userID = yield call(usersAPI.removeUser, action.payload);
        yield put({type: REMOVE_USER_SUCCESS, payload: userID.data});
    } catch (error) {
        yield put({type: REMOVE_USER_FAIL, payload: error});
    }
}

function* getUser(action) {
    try {
        const user = yield call(usersAPI.getUser, action.payload);
        yield put({type: GET_USER_SUCCESS, payload: user.data});
    } catch (error) {
        yield put({type: GET_USER_FAIL, payload: error});
    }
}

function* updateUser(action) {
    try {
        const user = yield call(usersAPI.updateUser, action.payload);
        yield put({type: UPDATE_USER_SUCCESS, payload: user.data});
    } catch (error) {
        yield put({type: UPDATE_USER_FAIL, payload: error});
    }
}

function* addUserInGroup(action) {
    try {
        const updated = yield call(usersAPI.addUserInGroup, action.payload);
        yield put({type: UPDATE_GROUP_SUCCESS, payload: updated.data.group});
        yield put({type: USER_JOIN_GROUP_SUCCESS, payload: updated.data});
    } catch (error) {
        yield put({type: UPDATE_GROUP_FAIL, payload: error});
        yield put({type: USER_JOIN_GROUP_FAIL, payload: error});
    }
}

function* leaveGroup(action) {
    try {
        const updated = yield call(usersAPI.leaveGroup, action.payload);
        yield put({type: UPDATE_GROUP_SUCCESS, payload: updated.data.group});
        yield put({type: USER_LEAVE_GROUP_SUCCESS, payload: updated.data});
    } catch (error) {
        yield put({type: USER_LEAVE_GROUP_FAIL, payload: error});
        yield put({type: UPDATE_GROUP_FAIL, payload: error});
    }
}


export default function* usersSaga() {
    yield all([
        takeEvery(USER_CREATE_PENDING, createUser),
        takeEvery(GET_USERS_PENDING, getUsers),
        takeEvery(REMOVE_USER_PENDING, removeUser),
        takeEvery(GET_USER_PENDING, getUser),
        takeEvery(UPDATE_USER_PENDING, updateUser),
        takeEvery(USER_JOIN_GROUP_PENDING, addUserInGroup),
        takeEvery(USER_LEAVE_GROUP_PENDING, leaveGroup)
    ]);
}
