import { call, put, takeEvery, all } from 'redux-saga/effects';
import GroupsAPI from "../api/groupsAPI";
import * as actions from '../actions/constants';


function* callgetGroup(action) {
    try {
        const group = yield call(GroupsAPI.getGroup, action.payload);
        yield put({type: actions.GET_GROUP, payload: group});
    } catch (e) {
        yield put({type: actions.GROUP_REQUEST_FAILED, message: e.message});
    }
}

function* callupdateGroup(action) {
    try {
        const group = yield call(GroupsAPI.updateGroup, action.payload);
        yield put({type: actions.UPDATE_GROUP, payload: group});
    } catch (e) {
        yield put({type: actions.GROUP_REQUEST_FAILED, message: e.message});
    }
}

function* callremoveUserFromGroup(action) {
    try {
        const groups = yield call(GroupsAPI.removeUserFromGroup, action.payload);
        yield put({type: actions.GROUP_UPDATE_USERS, payload: groups});
    } catch (e) {
        yield put({type: actions.GROUP_REQUEST_FAILED, message: e.message});
    }
}


export default function* groupSaga() {
    yield all([
        takeEvery(actions.GET_GROUP_REQUEST, callgetGroup),
        takeEvery(actions.UPDATE_GROUP_REQUEST, callupdateGroup),
        takeEvery(actions.REMOVE_USER_FROM_GROUP, callremoveUserFromGroup)
    ]);
}