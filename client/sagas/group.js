import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function requestGetGroups() {
    return axios.get('/api/groups')
        .then(groups => groups.data)
        .catch(err => err)
}

function* callgetGroups() {
    try {
        const groups = yield call(requestGetGroups);
        yield put({type: "GET_GROUPS", payload: groups});
    } catch (e) {
        yield put({type: "GET_GROUPS_REQUEST_FAILED", message: e.message});
    }
}


export default function* getGroups() {
    yield takeEvery('GET_GROUPS_REQUEST', callgetGroups);
}