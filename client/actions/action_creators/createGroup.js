import {
    GROUP_CREATE_REQUEST
} from '../index';

export const createGroupRequest = (data) => ({
    type: GROUP_CREATE_REQUEST,
    payload: data
});