import {
    GET_GROUPS_PENDING,
    SEARCH_GROUPS_PENDING,
    UPDATE_GROUP_PENDING,
    REMOVE_GROUP_PENDING,
    USER_JOIN_GROUP_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    REMOVE_USER_FROM_GROUP_PENDING,
    GROUP_CREATE_PENDING,
    GET_GROUP_PENDING
} from '../index';

export const createGroupRequest = (data) => ({
    type: GROUP_CREATE_PENDING,
    payload: data
});

export const getGroupRequest = (data) => ({
    type: GET_GROUP_PENDING,
    payload: data
});

export const getGroupsRequest = (data) => ({
    type: GET_GROUPS_PENDING,
    payload: data
});

export const searchGroupsRequest = (data) => ({
    type: SEARCH_GROUPS_PENDING,
    payload: data
});

export const updateGroupRequest = (data) => ({
    type: UPDATE_GROUP_PENDING,
    payload: data
});

export const removeGroupRequest = (data) => ({
    type: REMOVE_GROUP_PENDING,
    payload: data
});

export const joinGroup = (data) => ({
    type: USER_JOIN_GROUP_PENDING,
    payload: data
});

export const cancelJoinGroup = (data) => ({
    type: IS_USER_WANT_JOIN_GROUP,
    payload: data
});

export const removeUserRequest = (data) => ({
    type: REMOVE_USER_FROM_GROUP_PENDING,
    payload: data
});
