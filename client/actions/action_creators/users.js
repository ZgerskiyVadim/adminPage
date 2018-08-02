import {
    GET_USERS_REQUEST,
    SEARCH_USERS_REQUEST,
    UPDATE_USER_REQUEST,
    REMOVE_USER_REQUEST,
    IS_USER_WANT_JOIN_GROUP,
    LEAVE_GROUP_REQUEST,
    USER_CREATE_REQUEST,
    GET_USER_REQUEST
} from '../index';

export const createUserRequest = (data) => ({
    type: USER_CREATE_REQUEST,
    payload: data
});

export const getUserRequest = (data) => ({
    type: GET_USER_REQUEST,
    payload: data
});

export const joinGroup = (data) => ({
    type: IS_USER_WANT_JOIN_GROUP,
    payload: data
});

export const leaveGroupRequest = (data) => ({
    type: LEAVE_GROUP_REQUEST,
    payload: data
});

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
