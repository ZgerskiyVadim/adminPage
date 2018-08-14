import {
    GET_USERS_PENDING,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    REMOVE_USER_PENDING,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAIL,
    GET_USER_SUCCESS,
    GET_USER_PENDING,
    GET_USER_FAIL,
} from "../../../actions";


export const UPLOAD_USER = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@email.com',
    password: 'password',
    groups: [],
    _id: 1
};

export const UPLOAD_USERS = [
    UPLOAD_USER
];

export const UPDATE_USER_DATA = {
    username: 'updated-username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@email.com',
    password: 'password',
    _id: 1
};

export const REMOVE_USER_DATA = {
    _id: 1
};

export const actionsReducer = {
    uploadUsers: {
        pending: {
            type: GET_USERS_PENDING,
        },
        success: {
            type: GET_USERS_SUCCESS,
            payload: UPLOAD_USERS,
        },
        fail: {
            type: GET_USERS_FAIL,
            payload: 'Error Message',
        },
    },

    uploadUser: {
        pending: {
            type: GET_USER_PENDING,
        },
        success: {
            type: GET_USER_SUCCESS,
            payload: UPLOAD_USER,
        },
        fail: {
            type: GET_USER_FAIL,
            payload: 'Error Message',
        },
    },

    updateUser: {
        pending: {
            type: UPDATE_USER_PENDING
        },
        success: {
            type: UPDATE_USER_SUCCESS,
            payload: UPDATE_USER_DATA
        },
        fail: {
            type: UPDATE_USER_FAIL,
            payload: 'Error Message',
        },
    },

    removeUser: {
        pending: {
            type: REMOVE_USER_PENDING
        },
        success: {
            type: REMOVE_USER_SUCCESS,
            payload: REMOVE_USER_DATA
        },
        fail: {
            type: REMOVE_USER_FAIL,
            payload: 'Error Message',
        },
    },
};
