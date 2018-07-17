import { call, put, takeEvery, all } from 'redux-saga/effects';
import GroupsAPI from "../api/groupsAPI";
import * as actions from '../actions/constants';


function* callremoveGroup(action) {
    try {
        const id = yield call(GroupsAPI.removeGroup, action.payload);
        yield put({type: actions.REMOVE_GROUP, payload: id});
    } catch (e) {
        yield put({type: actions.GROUPS_REQUEST_FAILED, message: e.message});
    }
}



export default function* groupSaga() {
    yield all([
        takeEvery(actions.REMOVE_GROUP_REQUEST, callremoveGroup)
    ]);
}