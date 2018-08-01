import {call, put, takeEvery, all} from 'redux-saga/effects';
import * as groupsAPI from '../services/api/groupsAPI';
import {
    GET_GROUP,
    GET_GROUP_REQUEST,
    UPDATE_GROUP,
    UPDATE_GROUP_REQUEST,
    REMOVE_USER_FROM_GROUP,
    GROUP_REQUEST_FAILED,
    GROUPS_REQUEST_FAILED
} from '../actions';


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


export default function* groupSaga() {
    yield all([
        takeEvery(GET_GROUP_REQUEST, getGroup),
        takeEvery(UPDATE_GROUP_REQUEST, updateGroup),
        takeEvery(REMOVE_USER_FROM_GROUP, removeUserFromGroup)
    ]);
}
