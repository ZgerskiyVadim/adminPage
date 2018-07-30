import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as groupsAPI from '../services/api/groupsAPI';
import {
    GET_GROUPS,
    GET_GROUPS_REQUEST,
    SEARCH_GROUPS_REQUEST,
    REMOVE_GROUP,
    REMOVE_GROUP_REQUEST,
    GROUPS_REQUEST_FAILED
} from '../actions';


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

export default function* groupsSaga() {
    yield all([
        takeEvery(GET_GROUPS_REQUEST, getGroups),
        takeEvery(SEARCH_GROUPS_REQUEST, searchGroups),
        takeEvery(REMOVE_GROUP_REQUEST, removeGroup)
    ]);
}
