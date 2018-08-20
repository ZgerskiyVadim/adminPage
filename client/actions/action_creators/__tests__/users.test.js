import {
    GET_USERS_PENDING,
    UPDATE_USER_PENDING,
    REMOVE_USER_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    USER_LEAVE_GROUP_PENDING,
    USER_CREATE_PENDING,
    GET_USER_PENDING
} from '../../index';

import * as actions from '../users';

const data = {
    users: []
};

function expectedValue(data, type) {
    return {
        payload: data,
        type
    }

}

describe('User actions', () => {
    it('should get action "createUserRequest"', () => {
        expect(actions.createUserRequest(data)).toEqual(expectedValue(data, USER_CREATE_PENDING))
    });

    it('should get action "getUserRequest"', () => {
        expect(actions.getUserRequest(data)).toEqual(expectedValue(data, GET_USER_PENDING))
    });

    it('should get action "startJoiningGroup"', () => {
        expect(actions.startJoiningGroup(data)).toEqual(expectedValue(data, IS_USER_WANT_JOIN_GROUP))
    });

    it('should get action "leaveGroupRequest"', () => {
        expect(actions.leaveGroupRequest(data)).toEqual(expectedValue(data, USER_LEAVE_GROUP_PENDING))
    });

    it('should get action "getUsersRequest"', () => {
        expect(actions.getUsersRequest(data)).toEqual(expectedValue(data, GET_USERS_PENDING))
    });

    it('should get action "updateUserRequest"', () => {
        expect(actions.updateUserRequest(data)).toEqual(expectedValue(data, UPDATE_USER_PENDING))
    });

    it('should get action "removeUserRequest"', () => {
        expect(actions.removeUserRequest(data)).toEqual(expectedValue(data, REMOVE_USER_PENDING))
    });
});