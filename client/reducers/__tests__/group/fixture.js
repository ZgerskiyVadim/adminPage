import {
    GET_GROUP_PENDING,
    GET_GROUP_SUCCESS,
    GET_GROUP_FAIL,
    UPDATE_GROUP_PENDING,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL
} from "../../../actions";

export const UPLOAD_GROUP = {
    name: 'name',
    title: 'title',
    users: []
};

export const UPDATE_GROUP_DATA = {
    name: 'updated-name',
    title: 'updated-title',
    users: []
};

export const actionsReducer = {
    uploadGroup: {
        pending: {
            type: GET_GROUP_PENDING,
        },
        success: {
            type: GET_GROUP_SUCCESS,
            payload: UPLOAD_GROUP,
        },
        fail: {
            type: GET_GROUP_FAIL,
            payload: 'Error Message',
        },
    },

    updateGroup: {
        pending: {
            type: UPDATE_GROUP_PENDING
        },
        success: {
            type: UPDATE_GROUP_SUCCESS,
            payload: UPDATE_GROUP_DATA
        },
        fail: {
            type: UPDATE_GROUP_FAIL,
            payload: 'Error Message',
        },
    },
};
