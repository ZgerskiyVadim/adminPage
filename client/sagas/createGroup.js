import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as groupsAPI from '../services/api/groupsAPI';

import {
    GROUP_CREATED,
    GROUP_CREATE_REQUEST,
    CREATE_GROUP_REQUEST_FAILED
} from '../actions';

function* createGroup(action) {
    try {
        yield call(groupsAPI.create, action.payload);
        yield put({type: GROUP_CREATED});
    } catch (error) {
        yield put({type: CREATE_GROUP_REQUEST_FAILED, payload: error});
    }
}

export default function* createGroupSaga() {
    yield all([
        takeEvery(GROUP_CREATE_REQUEST, createGroup)
    ]);
}
