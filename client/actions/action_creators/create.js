import {
    USER_CREATE_REQUEST,
    GROUP_CREATE_REQUEST
} from "../index";

export const createUserRequest = (data) => ({
    type: USER_CREATE_REQUEST,
    payload: data
});

export const createGroupRequest = (data) => ({
    type: GROUP_CREATE_REQUEST,
    payload: data
});