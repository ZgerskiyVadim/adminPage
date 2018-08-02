import {fork, all} from 'redux-saga/effects';
import usersSaga from './users';
import groupsSaga from './groups';

export default function* rootSaga() {
    yield all([
        fork(usersSaga),
        fork(groupsSaga)
    ]);
}
