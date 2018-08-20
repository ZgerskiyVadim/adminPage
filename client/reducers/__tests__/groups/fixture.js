import {
    GET_GROUPS_PENDING,
    GET_GROUPS_SUCCESS,
    GET_GROUPS_FAIL,
    UPDATE_GROUP_PENDING,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,
    REMOVE_GROUP_PENDING,
    REMOVE_GROUP_SUCCESS,
    REMOVE_GROUP_FAIL,
    GET_GROUP_SUCCESS,
    GET_GROUP_FAIL,
    GET_GROUP_PENDING,
    GROUP_CREATED_SUCCESS,
    GROUP_CREATE_PENDING,
    CREATE_GROUP_FAIL
} from "../../../actions";

export const UPLOAD_GROUP = {
    name: 'name',
    title: 'title',
    users: [],
    _id: 1
};

export const UPLOAD_GROUPS = [
    UPLOAD_GROUP
];

export const UPDATE_GROUP_DATA = {
    name: 'update-name',
    title: 'update-title',
    _id: 1
};

export const REMOVE_GROUP_DATA = {
    _id: 1
};

export const actionsReducer = {
    uploadGroups: {
        pending: {
            type: GET_GROUPS_PENDING,
        },
        success: {
            type: GET_GROUPS_SUCCESS,
            payload: UPLOAD_GROUPS,
        },
        fail: {
            type: GET_GROUPS_FAIL,
            payload: 'Error Message',
        },
    },

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
    removeGroup: {
        pending: {
            type: REMOVE_GROUP_PENDING
        },
        success: {
            type: REMOVE_GROUP_SUCCESS,
            payload: REMOVE_GROUP_DATA
        },
        fail: {
            type: REMOVE_GROUP_FAIL,
            payload: 'Error Message',
        },
    },
    createGroup: {
        pending: {
            type: GROUP_CREATE_PENDING
        },
        success: {
            type: GROUP_CREATED_SUCCESS,
            payload: UPDATE_GROUP_DATA
        },
        fail: {
            type: CREATE_GROUP_FAIL,
            payload: 'Error Message',
        },
    },
};
