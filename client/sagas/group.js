import { call, put, takeEvery } from 'redux-saga/effects';
import GroupsAPI from '../api/groupsAPI';


function* callgetGroups() {
    try {
        const groups = yield call(GroupsAPI.getGroups);
        yield put({type: "GET_GROUPS", payload: groups});
    } catch (e) {
        yield put({type: "GET_GROUPS_REQUEST_FAILED", message: e.message});
    }
}

function* callremoveGroup(action) {
    try {
        const id = yield call(GroupsAPI.removeGroup, action.payload);
        yield put({type: "REMOVE_GROUP", payload: id});
    } catch (e) {
        yield put({type: "REMOVE_GROUP_REQUEST_FAILED", message: e.message});
    }
}


export function* getGroups() {
    yield takeEvery('GET_GROUPS_REQUEST', callgetGroups);
}

export function* removeGroup() {
    yield takeEvery('REMOVE_GROUP_REQUEST', callremoveGroup);
}