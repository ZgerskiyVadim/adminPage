import {
    GET_GROUPS_REQUEST,
    SEARCH_GROUPS_REQUEST,
    UPDATE_GROUP_REQUEST,
    REMOVE_GROUP_REQUEST,
    ADD_USER_IN_GROUP_REQUEST,
    IS_JOINING_GROUP,
    REMOVE_USER_FROM_GROUP
} from '../index';

export const getGroupsRequest = (data) => ({
    type: GET_GROUPS_REQUEST,
    payload: data
});

export const searchGroupsRequest = (data) => ({
    type: SEARCH_GROUPS_REQUEST,
    payload: data
});

export const updateGroupRequest = (data) => ({
    type: UPDATE_GROUP_REQUEST,
    payload: data
});

export const removeGroupRequest = (data) => ({
    type: REMOVE_GROUP_REQUEST,
    payload: data
});

export const joinGroup = (data) => ({
    type: ADD_USER_IN_GROUP_REQUEST,
    payload: data
});

export const cancelJoinGroup = (data) => ({
    type: IS_JOINING_GROUP,
    payload: data
});

export const removeUserRequest = (data) => ({
    type: REMOVE_USER_FROM_GROUP,
    payload: data
});