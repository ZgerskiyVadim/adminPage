import {
    GET_USERS_PENDING,
    UPDATE_USER_PENDING,
    REMOVE_USER_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    USER_LEAVE_GROUP_PENDING,
    USER_CREATE_PENDING,
    GET_USER_PENDING,
    USER_LOGIN_PENDING
} from '../index';

export function createUserRequest(data) {
    return {
        type: USER_CREATE_PENDING,
        payload: data
    }
}

export function userLoginRequest(data) {
    return {
        type: USER_LOGIN_PENDING,
        payload: data
    }
}

export function getUserRequest(data) {
    return {
        type: GET_USER_PENDING,
        payload: data
    }
}

export function startJoiningGroup(data) {
    return {
        type: IS_USER_WANT_JOIN_GROUP,
        payload: data
    }
}

export function leaveGroupRequest(data) {
    return {
        type: USER_LEAVE_GROUP_PENDING,
        payload: data
    }
}

export function getUsersRequest(data) {
    return {
        type: GET_USERS_PENDING,
        payload: data
    }
}

export function updateUserRequest(data) {
    return {
        type: UPDATE_USER_PENDING,
        payload: data
    }
}

export function removeUserRequest(data) {
    return {
        type: REMOVE_USER_PENDING,
        payload: data
    }
}