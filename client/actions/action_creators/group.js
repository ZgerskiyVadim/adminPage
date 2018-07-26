import {
    GET_GROUP_REQUEST,
    UPDATE_GROUP_REQUEST,
    REMOVE_USER_FROM_GROUP
} from '../index';

export const getGroupRequest = (data) => ({
    type: GET_GROUP_REQUEST,
    payload: data
});

export const updateGroupRequest = (data) => ({
    type: UPDATE_GROUP_REQUEST,
    payload: data
});

export const removeUserRequest = (data) => ({
    type: REMOVE_USER_FROM_GROUP,
    payload: data
});
