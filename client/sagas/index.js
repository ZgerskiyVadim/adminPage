import { fork, all } from 'redux-saga/effects';

import { getUsers, searchUsers, removeUser } from './user';
import { getGroups, searchGroups, removeGroup } from './group';

export default function* mySaga() {
    yield all([
        fork(getUsers),
        fork(searchUsers),
        fork(removeUser),
        fork(getGroups),
        fork(searchGroups),
        fork(removeGroup),
    ])
}