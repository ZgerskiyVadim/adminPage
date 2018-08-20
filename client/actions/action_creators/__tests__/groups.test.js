import {
    GET_GROUP_PENDING,
    GET_GROUPS_PENDING,
    GROUP_CREATE_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    REMOVE_GROUP_PENDING,
    REMOVE_USER_FROM_GROUP_PENDING,
    UPDATE_GROUP_PENDING,
    USER_JOIN_GROUP_PENDING
} from "../../index";

import * as actions from '../groups';

function expectedValue(data, type) {
    return {
        payload: data,
        type
    }
}

describe('Group actions', () => {
    it('should get action "createGroupRequest"', () => {
        const data = {
            name: 'name',
            title: 'title'
        };
        expect(actions.createGroupRequest(data)).toEqual(expectedValue(data, GROUP_CREATE_PENDING))
    });

    it('should get action "getGroupRequest"', () => {
        const data = {
            id: 1
        };
        expect(actions.getGroupRequest(data)).toEqual(expectedValue(data, GET_GROUP_PENDING))
    });

    it('should get action "getGroupsRequest"', () => {
        const data = {
            limit: 10,
            searchBy: ''
        };
        expect(actions.getGroupsRequest(data)).toEqual(expectedValue(data, GET_GROUPS_PENDING))
    });

    it('should get action "updateGroupRequest"', () => {
        const data = {
            limit: 10,
            searchBy: ''
        };
        expect(actions.updateGroupRequest(data)).toEqual(expectedValue(data, UPDATE_GROUP_PENDING))
    });

    it('should get action "removeGroupRequest"', () => {
        const data = {
            id: 1
        };
        expect(actions.removeGroupRequest(data)).toEqual(expectedValue(data, REMOVE_GROUP_PENDING))
    });

    it('should get action "joinGroup"', () => {
        const data = {
            userID: 1,
            groupID: 1
        };
        expect(actions.joinGroup(data)).toEqual(expectedValue(data, USER_JOIN_GROUP_PENDING))
    });

    it('should get action "cancelJoinGroup"', () => {
        const data = false;
        expect(actions.cancelJoinGroup(data)).toEqual(expectedValue(data, IS_USER_WANT_JOIN_GROUP))
    });

    it('should get action "removeUserFromGroupRequest"', () => {
        const data = {
            userID: 1,
            groupID: 1
        };
        expect(actions.removeUserFromGroupRequest(data)).toEqual(expectedValue(data, REMOVE_USER_FROM_GROUP_PENDING))
    });
});
