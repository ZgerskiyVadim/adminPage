import { fork, all } from 'redux-saga/effects';

import getUsers from './user';
import getGroups from './group';

export default function* mySaga() {
    yield all([
        fork(getUsers),
        fork(getGroups),
    ])
}