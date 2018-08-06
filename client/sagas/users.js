import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as usersAPI from '../services/api/usersAPI';
import {
    USER_CREATED,
    USER_CREATE_REQUEST,
    CREATE_USER_REQUEST_FAILED,
    GET_USERS,
    GET_USERS_REQUEST,
    SEARCH_USERS_REQUEST,
    REMOVE_USER,
    REMOVE_USER_REQUEST,
    USERS_REQUEST_FAILED,
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
    GROUPS_REQUEST_FAILED
} from '../actions';

function* createUser(action) {
    try {
        yield call(usersAPI.create, action.payload);
        yield put({type: USER_CREATED});
    } catch (error) {
        yield put({type: CREATE_USER_REQUEST_FAILED, payload: error});
    }
}

function* getUsers(action) {
    try {
        const users = yield call(usersAPI.getUsers, action.payload);
        yield put({type: GET_USERS, payload: users});
    } catch (error) {
        yield put({type: USERS_REQUEST_FAILED, payload: error});
    }
}

function* searchUsers(action) {
    try {
        const users = yield call(usersAPI.searchUsers, action.payload);
        yield put({type: GET_USERS, payload: users});
    } catch (error) {
        yield put({type: USERS_REQUEST_FAILED, payload: error});
    }
}

function* removeUser(action) {
    try {
        const id = yield call(usersAPI.removeUser, action.payload);
        yield put({type: REMOVE_USER, payload: id});
    } catch (error) {
        yield put({type: USERS_REQUEST_FAILED, payload: error});
    }
}

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
        yield put({type: UPDATE_GROUP, payload: updated.group});
        yield put({type: USER_JOINED_GROUP, payload: updated.group});
    } catch (error) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* leaveGroup(action) {
    try {
        const updated = yield call(usersAPI.leaveGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: updated.group});
        yield put({type: USER_LEFT_GROUP, payload: updated.group});
    } catch (error) {
        yield put({type: USER_REQUEST_FAILED, payload: error});
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}


export default function* usersSaga() {
    yield all([
        takeEvery(USER_CREATE_REQUEST, createUser),
        takeEvery(GET_USERS_REQUEST, getUsers),
        takeEvery(SEARCH_USERS_REQUEST, searchUsers),
        takeEvery(REMOVE_USER_REQUEST, removeUser),
        takeEvery(GET_USER_REQUEST, getUser),
        takeEvery(UPDATE_USER_REQUEST, updateUser),
        takeEvery(ADD_USER_IN_GROUP_REQUEST, addUserInGroup),
        takeEvery(LEAVE_GROUP_REQUEST, leaveGroup)
    ]);
}
