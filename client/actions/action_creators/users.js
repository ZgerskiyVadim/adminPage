import {
    GET_USERS_REQUEST,
    SEARCH_USERS_REQUEST,
    UPDATE_USER_REQUEST,
    REMOVE_USER_REQUEST
} from '../index';

export const getUsersRequest = (data) => ({
    type: GET_USERS_REQUEST,
    payload: data
});

export const searchUsersRequest = (data) => ({
    type: SEARCH_USERS_REQUEST,
    payload: data
});

export const updateUserRequest = (data) => ({
    type: UPDATE_USER_REQUEST,
    payload: data
});

export const removeUserRequest = (data) => ({
    type: REMOVE_USER_REQUEST,
    payload: data
});
