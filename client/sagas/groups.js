import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as GroupsAPI from '../services/api/groupsAPI';
import * as types from '../actions';


function* callgetGroups(action) {
    try {
        const groups = yield call(GroupsAPI.getGroups, action.payload);
        yield put({type: types.GET_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: types.GROUPS_REQUEST_FAILED, message: e.message});
    }
}

function* callsearchGroups(action) {
    try {
        const groups = yield call(GroupsAPI.searchGroups, action.payload);
        yield put({type: types.GET_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: types.GROUPS_REQUEST_FAILED, message: e.message});
    }
}

function* callremoveGroup(action) {
    try {
        const id = yield call(GroupsAPI.removeGroup, action.payload);
        yield put({type: types.REMOVE_GROUP, payload: id});
    } catch (e) {
        yield put({type: types.GROUPS_REQUEST_FAILED, message: e.message});
    }
}

export default function* groupsSaga() {
    yield all([
        takeEvery(types.GET_GROUPS_REQUEST, callgetGroups),
        takeEvery(types.SEARCH_GROUPS_REQUEST, callsearchGroups),
        takeEvery(types.REMOVE_GROUP_REQUEST, callremoveGroup)
    ]);
}