import {
    GET_USERS_PENDING,
    SEARCH_USERS_PENDING,
    UPDATE_USER_PENDING,
    REMOVE_USER_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    LEAVE_GROUP_PENDING,
    USER_CREATE_PENDING,
    GET_USER_PENDING,
    LOGIN_PENDING,
    LOGOUT_PENDING
} from '../index';

export const createUserRequest = (data) => ({
    type: USER_CREATE_PENDING,
    payload: data
});

export const getUserRequest = (data) => ({
    type: GET_USER_PENDING,
    payload: data
});

export const startJoiningGroup = (data) => ({
    type: IS_USER_WANT_JOIN_GROUP,
    payload: data
});

export const leaveGroupRequest = (data) => ({
    type: LEAVE_GROUP_PENDING,
    payload: data
});

export const getUsersRequest = (data) => ({
    type: GET_USERS_PENDING,
    payload: data
});

export const searchUsersRequest = (data) => ({
    type: SEARCH_USERS_PENDING,
    payload: data
});

export const updateUserRequest = (data) => ({
    type: UPDATE_USER_PENDING,
    payload: data
});

export const removeUserRequest = (data) => ({
    type: REMOVE_USER_PENDING,
    payload: data
});

export const login = (data) => ({
    type: LOGIN_PENDING,
    payload: data
});

export const logout = () => ({
    type: LOGOUT_PENDING
});
