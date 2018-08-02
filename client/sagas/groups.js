import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as groupsAPI from '../services/api/groupsAPI';
import {
    GROUP_CREATED,
    GROUP_CREATE_REQUEST,
    CREATE_GROUP_REQUEST_FAILED,
    GET_GROUPS,
    GET_GROUPS_REQUEST,
    SEARCH_GROUPS_REQUEST,
    REMOVE_GROUP,
    REMOVE_GROUP_REQUEST,
    GROUPS_REQUEST_FAILED,
    GET_GROUP,
    GET_GROUP_REQUEST,
    UPDATE_GROUP,
    UPDATE_GROUP_REQUEST,
    REMOVE_USER_FROM_GROUP,
    GROUP_REQUEST_FAILED
} from '../actions';


function* createGroup(action) {
    try {
        yield call(groupsAPI.create, action.payload);
        yield put({type: GROUP_CREATED});
    } catch (error) {
        yield put({type: CREATE_GROUP_REQUEST_FAILED, payload: error});
    }
}

function* getGroups(action) {
    try {
        const groups = yield call(groupsAPI.getGroups, action.payload);
        yield put({type: GET_GROUPS, payload: groups});
    } catch (error) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* searchGroups(action) {
    try {
        const groups = yield call(groupsAPI.searchGroups, action.payload);
        yield put({type: GET_GROUPS, payload: groups});
    } catch (error) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* removeGroup(action) {
    try {
        const id = yield call(groupsAPI.removeGroup, action.payload);
        yield put({type: REMOVE_GROUP, payload: id});
    } catch (error) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* getGroup(action) {
    try {
        const group = yield call(groupsAPI.getGroup, action.payload);
        yield put({type: GET_GROUP, payload: group});
    } catch (error) {
        yield put({type: GROUP_REQUEST_FAILED, payload: error});
    }
}

function* updateGroup(action) {
    try {
        const group = yield call(groupsAPI.updateGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: group});
    } catch (error) {
        yield put({type: GROUP_REQUEST_FAILED, payload: error});
        yield put({type: GROUPS_REQUEST_FAILED, payload: error});
    }
}

function* removeUserFromGroup(action) {
    try {
        const updated = yield call(groupsAPI.removeUserFromGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: updated.group});
    } catch (error) {
        yield put({type: GROUP_REQUEST_FAILED, payload: error});
    }
}

export default function* groupsSaga() {
    yield all([
        takeEvery(GROUP_CREATE_REQUEST, createGroup),
        takeEvery(GET_GROUPS_REQUEST, getGroups),
        takeEvery(SEARCH_GROUPS_REQUEST, searchGroups),
        takeEvery(REMOVE_GROUP_REQUEST, removeGroup),
        takeEvery(GET_GROUP_REQUEST, getGroup),
        takeEvery(UPDATE_GROUP_REQUEST, updateGroup),
        takeEvery(REMOVE_USER_FROM_GROUP, removeUserFromGroup)
    ]);
}
