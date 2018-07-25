import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as groupsAPI from "../services/api/groupsAPI";
import {
    GET_GROUP,
    GET_GROUP_REQUEST,
    UPDATE_GROUP,
    UPDATE_GROUP_REQUEST,
    REMOVE_USER_FROM_GROUP,
    GROUP_REQUEST_FAILED
} from '../actions';


function* callgetGroup(action) {
    try {
        const group = yield call(groupsAPI.getGroup, action.payload);
        yield put({type: GET_GROUP, payload: group});
    } catch (e) {
        yield put({type: GROUP_REQUEST_FAILED, payload: e.message});
    }
}

function* callupdateGroup(action) {
    try {
        const group = yield call(groupsAPI.updateGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: group});
    } catch (e) {
        yield put({type: GROUP_REQUEST_FAILED, payload: e.message});
    }
}

function* callremoveUserFromGroup(action) {
    try {
        const updatedGroup = yield call(groupsAPI.removeUserFromGroup, action.payload);
        yield put({type: UPDATE_GROUP, payload: updatedGroup});
    } catch (e) {
        yield put({type: GROUP_REQUEST_FAILED, payload: e.message});
    }
}


export default function* groupSaga() {
    yield all([
        takeEvery(GET_GROUP_REQUEST, callgetGroup),
        takeEvery(UPDATE_GROUP_REQUEST, callupdateGroup),
        takeEvery(REMOVE_USER_FROM_GROUP, callremoveUserFromGroup)
    ]);
}