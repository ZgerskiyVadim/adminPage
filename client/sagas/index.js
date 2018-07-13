import { fork } from 'redux-saga/effects';

import getUsers from './user';
import getGroups from './group';

export default function* mySaga() {
    yield [
        fork(getUsers),
        fork(getGroups),
    ]
}