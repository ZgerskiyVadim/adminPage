import {
    GET_GROUPS_REQUEST,
    SEARCH_GROUPS_REQUEST,
    UPDATE_GROUP_REQUEST,
    REMOVE_GROUP_REQUEST,
    ADD_USER_IN_GROUP_REQUEST,
    IS_USER_WANT_JOIN_GROUP,
    REMOVE_USER_FROM_GROUP,
    GROUP_CREATE_REQUEST,
    GET_GROUP_REQUEST
} from '../index';

export const createGroupRequest = (data) => ({
    type: GROUP_CREATE_REQUEST,
    payload: data
});

export const getGroupRequest = (data) => ({
    type: GET_GROUP_REQUEST,
    payload: data
});

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
    type: IS_USER_WANT_JOIN_GROUP,
    payload: data
});

export const removeUserRequest = (data) => ({
    type: REMOVE_USER_FROM_GROUP,
    payload: data
});
