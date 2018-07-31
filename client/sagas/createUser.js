import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as usersApi from '../services/api/usersAPI';

import {
    USER_CREATED,
    USER_CREATE_REQUEST,
    CREATE_USER_REQUEST_FAILED
} from '../actions';


function* createUser(action) {
    try {
        yield call(usersApi.create, action.payload);
        yield put({type: USER_CREATED});
    } catch (error) {
        yield put({type: CREATE_USER_REQUEST_FAILED, payload: error});
    }
}

export default function* createUserSaga() {
    yield all([
        takeEvery(USER_CREATE_REQUEST, createUser)
    ]);
}
