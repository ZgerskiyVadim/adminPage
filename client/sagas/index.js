import { fork, all } from 'redux-saga/effects';

import { getUsers, removeUser } from './user';
import { getGroups, removeGroup } from './group';

export default function* mySaga() {
    yield all([
        fork(getUsers),
        fork(removeUser),
        fork(getGroups),
        fork(removeGroup),
    ])
}