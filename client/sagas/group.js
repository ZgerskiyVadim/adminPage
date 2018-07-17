import { call, put, takeEvery } from 'redux-saga/effects';
import GroupsAPI from '../api/groupsAPI';
import * as actions from '../actions/constants';


function* callgetGroups() {
    try {
        const groups = yield call(GroupsAPI.getGroups);
        yield put({type: actions.GET_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: actions.GROUPS_REQUEST_FAILED, message: e.message});
    }
}

function* callsearchGroups(action) {
    try {
        const groups = yield call(GroupsAPI.searchGroups, action.payload);
        yield put({type: actions.GET_GROUPS, payload: groups});
    } catch (e) {
        yield put({type: actions.GROUPS_REQUEST_FAILED, message: e.message});
    }
}

function* callremoveGroup(action) {
    try {
        const id = yield call(GroupsAPI.removeGroup, action.payload);
        yield put({type: actions.REMOVE_GROUP, payload: id});
    } catch (e) {
        yield put({type: actions.GROUPS_REQUEST_FAILED, message: e.message});
    }
}


export function* getGroups() {
    yield takeEvery(actions.GET_GROUPS_REQUEST, callgetGroups);
}

export function* searchGroups() {
    yield takeEvery(actions.SEARCH_GROUPS_REQUEST, callsearchGroups);
}

export function* removeGroup() {
    yield takeEvery(actions.REMOVE_GROUP_REQUEST, callremoveGroup);
}