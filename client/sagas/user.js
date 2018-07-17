import { call, put, takeEvery } from 'redux-saga/effects';
import UsersAPI from '../api/usersAPI';
import * as actions from '../actions/constants';

function* callremoveUser(action) {
    try {
        const id = yield call(UsersAPI.removeUser, action.payload);
        yield put({type: actions.REMOVE_USER, payload: id});
    } catch (e) {
        yield put({type: actions.USERS_REQUEST_FAILED, message: e.message});
    }
}


export default function* userSaga() {
    yield [
        takeEvery(actions.REMOVE_USER_REQUEST, callremoveUser)
    ];
}