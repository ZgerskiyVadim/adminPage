import { fork, all } from 'redux-saga/effects';
import usersSaga from './users';
import userSaga from './user';
import groupsSaga from './groups';
import groupSaga from './group';
import createSaga from './create';

export default function* rootSaga() {
    yield all([
        fork(usersSaga),
        fork(userSaga),
        fork(groupsSaga),
        fork(groupSaga),
        fork(createSaga),
    ]);
}