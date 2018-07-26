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


function* callgetGroups(action) {
    try {
        const groups = yield call(groupsAPI.getGroups, action.payload);
        yield put({type: GET_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: e.message});
    }
}

function* callsearchGroups(action) {
    try {
        const groups = yield call(groupsAPI.searchGroups, action.payload);
        yield put({type: GET_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: e.message});
    }
}

function* callremoveGroup(action) {
    try {
        const id = yield call(groupsAPI.removeGroup, action.payload);
        yield put({type: REMOVE_GROUP, payload: id});
    } catch (e) {
        yield put({type: GROUPS_REQUEST_FAILED, payload: e.message});
    }
}

export default function* groupsSaga() {
    yield all([
        takeEvery(GET_GROUPS_REQUEST, callgetGroups),
        takeEvery(SEARCH_GROUPS_REQUEST, callsearchGroups),
        takeEvery(REMOVE_GROUP_REQUEST, callremoveGroup)
    ]);
}
