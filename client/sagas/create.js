import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as groupsAPI from '../services/api/groupsAPI';
import * as usersApi from '../services/api/usersAPI';

import {
    USER_CREATED,
    USER_CREATE_REQUEST,
    GROUP_CREATED,
    GROUP_CREATE_REQUEST,
    CREATE_REQUEST_FAILED
} from '../actions';


function* createUser(action) {
    try {
        yield call(usersApi.create, action.payload);
        yield put({type: USER_CREATED});
    } catch (error) {
        yield put({type: CREATE_REQUEST_FAILED, payload: error});
    }
}

function* createGroup(action) {
    try {
        yield call(groupsAPI.create, action.payload);
        yield put({type: GROUP_CREATED});
    } catch (error) {
        yield put({type: CREATE_REQUEST_FAILED, payload: error});
    }
}

export default function* createSaga() {
    yield all([
        takeEvery(USER_CREATE_REQUEST, createUser),
        takeEvery(GROUP_CREATE_REQUEST, createGroup)
    ]);
}
