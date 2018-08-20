import {
    GET_GROUPS_PENDING,
    UPDATE_GROUP_PENDING,
    REMOVE_GROUP_PENDING,
    USER_JOIN_GROUP_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    REMOVE_USER_FROM_GROUP_PENDING,
    GROUP_CREATE_PENDING,
    GET_GROUP_PENDING
} from '../index';

export function createGroupRequest(data) {
    return {
        type: GROUP_CREATE_PENDING,
        payload: data
    }
}

export function getGroupRequest(data) {
    return {
        type: GET_GROUP_PENDING,
        payload: data
    }
}

export function getGroupsRequest(data) {
    return {
        type: GET_GROUPS_PENDING,
        payload: data
    }
}

export function updateGroupRequest(data) {
    return {
        type: UPDATE_GROUP_PENDING,
        payload: data
    }
}

export function removeGroupRequest(data) {
    return {
        type: REMOVE_GROUP_PENDING,
        payload: data
    }
}

export function joinGroup(data) {
    return {
        type: USER_JOIN_GROUP_PENDING,
        payload: data
    }
}

export function cancelJoinGroup(data) {
    return {
        type: IS_USER_WANT_JOIN_GROUP,
        payload: data
    }
}

export function removeUserFromGroupRequest(data) {
    return {
        type: REMOVE_USER_FROM_GROUP_PENDING,
        payload: data
    }
}
