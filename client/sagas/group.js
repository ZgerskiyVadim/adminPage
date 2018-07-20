import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as GroupsAPI from "../services/api/groupsAPI";
import * as types from '../actions';


function* callgetGroup(action) {
    try {
        const group = yield call(GroupsAPI.getGroup, action.payload);
        yield put({type: types.GET_GROUP, payload: group});
    } catch (e) {
        yield put({type: types.GROUP_REQUEST_FAILED, message: e.message});
    }
}

function* callupdateGroup(action) {
    try {
        const group = yield call(GroupsAPI.updateGroup, action.payload);
        yield put({type: types.UPDATE_GROUP, payload: group});
    } catch (e) {
        yield put({type: types.GROUP_REQUEST_FAILED, message: e.message});
    }
}

function* callremoveUserFromGroup(action) {
    try {
        const groups = yield call(GroupsAPI.removeUserFromGroup, action.payload);
        yield put({type: types.GROUP_UPDATE_USERS, payload: groups});
    } catch (e) {
        yield put({type: types.GROUP_REQUEST_FAILED, message: e.message});
    }
}


export default function* groupSaga() {
    yield all([
        takeEvery(types.GET_GROUP_REQUEST, callgetGroup),
        takeEvery(types.UPDATE_GROUP_REQUEST, callupdateGroup),
        takeEvery(types.REMOVE_USER_FROM_GROUP, callremoveUserFromGroup)
    ]);
}