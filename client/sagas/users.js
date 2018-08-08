import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as usersAPI from '../services/api/usersAPI';
import {
    USER_CREATED_SUCCESS,
    USER_CREATE_PENDING,
    CREATE_USER_FAIL,
    GET_USERS_SUCCESS,
    GET_USERS_PENDING,
    SEARCH_USERS_PENDING,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_PENDING,
    USERS_FAIL,
    GET_USER_SUCCESS,
    USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_GROUP_SUCCESS,
    USER_LEFT_GROUP_SUCCESS,
    GET_USER_PENDING,
    UPDATE_USER_PENDING,
    ADD_USER_IN_GROUP_PENDING,
    USER_JOINED_GROUP_SUCCESS,
    LEAVE_GROUP_PENDING,
    GROUPS_FAIL,
    LOGIN_PENDING,
    USER_LOGGED_SUCCESS,
    LOGOUT_PENDING,
    USER_LOGOUT_SUCCESS,
    AUTHENTICATE_FAILED
} from '../actions';

function* login(action) {
    try {
        yield call(usersAPI.login, action.payload);
        yield put({type: USER_LOGGED_SUCCESS});
    } catch (error) {
        yield put({type: AUTHENTICATE_FAILED, payload: error});
    }
}

function* logout() {
    try {
        yield call(usersAPI.logout);
        yield put({type: USER_LOGOUT_SUCCESS});
    } catch (error) {
        yield put({type: AUTHENTICATE_FAILED, payload: error});
    }
}

function* createUser(action) {
    try {
        yield call(usersAPI.create, action.payload);
        yield put({type: USER_CREATED_SUCCESS});
    } catch (error) {
        yield put({type: CREATE_USER_FAIL, payload: error});
    }
}

function* getUsers(action) {
    try {
        const users = yield call(usersAPI.getUsers, action.payload);
        yield put({type: GET_USERS_SUCCESS, payload: users});
    } catch (error) {
        yield put({type: USERS_FAIL, payload: error});
    }
}

function* searchUsers(action) {
    try {
        const users = yield call(usersAPI.searchUsers, action.payload);
        yield put({type: GET_USERS_SUCCESS, payload: users});
    } catch (error) {
        yield put({type: USERS_FAIL, payload: error});
    }
}

function* removeUser(action) {
    try {
        const id = yield call(usersAPI.removeUser, action.payload);
        yield put({type: REMOVE_USER_SUCCESS, payload: id});
    } catch (error) {
        yield put({type: USERS_FAIL, payload: error});
    }
}

function* getUser(action) {
    try {
        const user = yield call(usersAPI.getUser, action.payload);
        yield put({type: GET_USER_SUCCESS, payload: user});
    } catch (error) {
        yield put({type: USER_FAIL, payload: error});
    }
}

function* updateUser(action) {
    try {
        const user = yield call(usersAPI.updateUser, action.payload);
        yield put({type: UPDATE_USER_SUCCESS, payload: user});
    } catch (error) {
        yield put({type: USER_FAIL, payload: error});
        yield put({type: USERS_FAIL, payload: error});
    }
}

function* addUserInGroup(action) {
    try {
        const updated = yield call(usersAPI.addUserInGroup, action.payload);
        yield put({type: UPDATE_GROUP_SUCCESS, payload: updated.group});
        yield put({type: USER_JOINED_GROUP_SUCCESS, payload: updated.group});
    } catch (error) {
        yield put({type: GROUPS_FAIL, payload: error});
    }
}

function* leaveGroup(action) {
    try {
        const updated = yield call(usersAPI.leaveGroup, action.payload);
        yield put({type: UPDATE_GROUP_SUCCESS, payload: updated.group});
        yield put({type: USER_LEFT_GROUP_SUCCESS, payload: updated.group});
    } catch (error) {
        yield put({type: USER_FAIL, payload: error});
        yield put({type: GROUPS_FAIL, payload: error});
    }
}


export default function* usersSaga() {
    yield all([
        takeEvery(USER_CREATE_PENDING, createUser),
        takeEvery(GET_USERS_PENDING, getUsers),
        takeEvery(SEARCH_USERS_PENDING, searchUsers),
        takeEvery(REMOVE_USER_PENDING, removeUser),
        takeEvery(GET_USER_PENDING, getUser),
        takeEvery(UPDATE_USER_PENDING, updateUser),
        takeEvery(ADD_USER_IN_GROUP_PENDING, addUserInGroup),
        takeEvery(LEAVE_GROUP_PENDING, leaveGroup),
        takeEvery(LOGIN_PENDING, login),
        takeEvery(LOGOUT_PENDING, logout)
    ]);
}
