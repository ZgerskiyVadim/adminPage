import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from "../../../actions";
import {User} from "../../userReducer";

export const UPLOAD_USER = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@email.com',
    password: 'password',
    users: []
};

export const UPDATE_USER_DATA = {
    username: 'updated-username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@email.com',
    password: 'password',
    users: []
};

export const actionsReducer = {
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
};
