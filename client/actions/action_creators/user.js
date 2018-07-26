import {
    GET_USER_REQUEST,
    UPDATE_USER_REQUEST,
    IS_JOINING_GROUP,
    LEAVE_GROUP_REQUEST
} from '../index';

export const getUserRequest = (data) => ({
    type: GET_USER_REQUEST,
    payload: data
});

export const updateUserRequest = (data) => ({
    type: UPDATE_USER_REQUEST,
    payload: data
});

export const joinGroup = (data) => ({
    type: IS_JOINING_GROUP,
    payload: data
});

export const leaveGroupRequest = (data) => ({
    type: LEAVE_GROUP_REQUEST,
    payload: data
});
