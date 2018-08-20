import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as groupsAPI from '../services/api/groupsAPI';
import {
    GROUP_CREATED_SUCCESS,
    GROUP_CREATE_PENDING,
    CREATE_GROUP_FAIL,
    GET_GROUPS_SUCCESS,
    GET_GROUPS_PENDING,
    REMOVE_GROUP_SUCCESS,
    REMOVE_GROUP_PENDING,
    GET_GROUP_SUCCESS,
    GET_GROUP_PENDING,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_PENDING,
    REMOVE_USER_FROM_GROUP_PENDING,
    UPDATE_GROUP_FAIL,
    GET_GROUP_FAIL,
    GET_GROUPS_FAIL,
    REMOVE_GROUP_FAIL
} from '../actions';


function* createGroup(action) {
    try {
        const group = yield call(groupsAPI.create, action.payload);
        yield put({type: GROUP_CREATED_SUCCESS, payload: group.data});
    } catch (error) {
        yield put({type: CREATE_GROUP_FAIL, payload: error});
    }
}

function* getGroups(action) {
    try {
        const groups = yield call(groupsAPI.getGroups, action.payload);
        yield put({type: GET_GROUPS_SUCCESS, payload: groups.data});
    } catch (error) {
        yield put({type: GET_GROUPS_FAIL, payload: error});
    }
}

function* removeGroup(action) {
    try {
        const groupID = yield call(groupsAPI.removeGroup, action.payload);
        yield put({type: REMOVE_GROUP_SUCCESS, payload: groupID.data});
    } catch (error) {
        yield put({type: REMOVE_GROUP_FAIL, payload: error});
    }
}

function* getGroup(action) {
    try {
        const group = yield call(groupsAPI.getGroup, action.payload);
        yield put({type: GET_GROUP_SUCCESS, payload: group.data});
    } catch (error) {
        yield put({type: GET_GROUP_FAIL, payload: error});
    }
}

function* updateGroup(action) {
    try {
        const group = yield call(groupsAPI.updateGroup, action.payload);
        yield put({type: UPDATE_GROUP_SUCCESS, payload: group.data});
    } catch (error) {
        yield put({type: UPDATE_GROUP_FAIL, payload: error});
    }
}

function* removeUserFromGroup(action) {
    try {
        const updated = yield call(groupsAPI.removeUserFromGroup, action.payload);
        yield put({type: UPDATE_GROUP_SUCCESS, payload: updated.data.group});
    } catch (error) {
        yield put({type: UPDATE_GROUP_FAIL, payload: error});
    }
}

export default function* groupsSaga() {
    yield all([
        takeEvery(GROUP_CREATE_PENDING, createGroup),
        takeEvery(GET_GROUPS_PENDING, getGroups),
        takeEvery(REMOVE_GROUP_PENDING, removeGroup),
        takeEvery(GET_GROUP_PENDING, getGroup),
        takeEvery(UPDATE_GROUP_PENDING, updateGroup),
        takeEvery(REMOVE_USER_FROM_GROUP_PENDING, removeUserFromGroup)
    ]);
}
