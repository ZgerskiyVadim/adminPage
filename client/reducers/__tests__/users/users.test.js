import { Users, initialState } from '../../usersReducer';

import {
    actionsReducer,
    UPLOAD_USERS,
    UPLOAD_USER,
    UPDATE_USER_DATA,
    REMOVE_USER_DATA,
    EXPECTED_JOIN_GROUP,
    EXPECTED_LEFT_GROUP
} from './data';

describe('Users reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_USERS', () => {
            const result = Users(initialState, actionsReducer.uploadUsers.pending);
            expect(result.users.loading).toBe(true);
            expect(result.users.error).toBe(null);
        });

        it('should handle GET_USER', () => {
            const result = Users(initialState, actionsReducer.uploadUser.pending);
            expect(result.user.loading).toBe(true);
            expect(result.user.error).toBe(null);
        });

        it('should handle LOGIN_USER', () => {
            const result = Users(initialState, actionsReducer.loginUser.pending);
            expect(result.loggedUser.loading).toBe(true);
            expect(result.loggedUser.error).toBe(null);
        });

        it('should handle UPDATE_USER', () => {
            const result = Users(initialState, actionsReducer.updateUser.pending);
            expect(result.updatedUser.loading).toBe(true);
            expect(result.updatedUser.error).toBe(null);
        });

        it('should handle REMOVE_USER', () => {
            const result = Users(initialState, actionsReducer.removeUser.pending);
            expect(result.removedUser.loading).toBe(true);
            expect(result.removedUser.error).toBe(null);
        });

        it('should handle USER_JOIN_GROUP', () => {
            const result = Users(initialState, actionsReducer.userJoinGroup.pending);
            expect(result.userJoinedGroup.loading).toBe(true);
            expect(result.userJoinedGroup.error).toBe(null);
        });

        it('should handle USER_LEAVE_GROUP', () => {
            const result = Users(initialState, actionsReducer.userLeaveGroup.pending);
            expect(result.userLeftGroup.loading).toBe(true);
            expect(result.userLeftGroup.error).toBe(null);
        });

        it('should handle CREATE_USER', () => {
            const result = Users(initialState, actionsReducer.createUser.pending);
            expect(result.createdUser.loading).toBe(true);
            expect(result.createdUser.error).toBe(null);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_USERS', () => {
            const result = Users(initialState, actionsReducer.uploadUsers.success);
            expect(result.users.loading).toBe(false);
            expect(result.users.error).toBe(null);
            expect(result.users.data).toEqual(UPLOAD_USERS);
        });

        it('should handle GET_USER', () => {
            const result = Users(initialState, actionsReducer.uploadUser.success);
            expect(result.user.loading).toBe(false);
            expect(result.user.error).toBe(null);
            expect(result.user.data).toEqual(UPLOAD_USER);
        });

        it('should handle LOGIN_USER', () => {
            const result = Users(initialState, actionsReducer.loginUser.success);
            expect(result.loggedUser.loading).toBe(false);
            expect(result.loggedUser.error).toBe(null);
            expect(result.loggedUser.data).toEqual(UPLOAD_USER);
        });

        it('should handle UPDATE_USER', () => {
            const result = Users(initialState, actionsReducer.updateUser.success);
            expect(result.updatedUser.loading).toBe(false);
            expect(result.updatedUser.error).toBe(null);
            expect(result.updatedUser.data).toEqual(UPDATE_USER_DATA);
        });

        it('should handle REMOVE_USER', () => {
            const result = Users(initialState, actionsReducer.removeUser.success);
            expect(result.removedUser.loading).toBe(false);
            expect(result.removedUser.error).toBe(null);
            expect(result.users.data.length).toEqual(0);
            expect(result.removedUser.data).toEqual(REMOVE_USER_DATA);
        });

        it('should handle USER_IS_JOINING_GROUPS', () => {
            const result = Users(initialState, actionsReducer.userIsJoiningGroups.success);
            expect(result.user.isJoiningGroup).toBe(true);
        });

        it('should handle USER_JOIN_GROUP', () => {
            let result = Users(initialState, actionsReducer.uploadUser.success);
            result = Users(result, actionsReducer.userJoinGroup.success);
            expect(result.userJoinedGroup.loading).toBe(false);
            expect(result.userJoinedGroup.error).toBe(null);
            expect(result.user.data).toEqual(EXPECTED_JOIN_GROUP);
        });

        it('should handle USER_LEAVE_GROUP', () => {
            let result = Users(initialState, actionsReducer.uploadUser.success);
            result = Users(result, actionsReducer.userLeaveGroup.success);
            expect(result.userLeftGroup.loading).toBe(false);
            expect(result.userLeftGroup.error).toBe(null);
            expect(result.user.data).toEqual(EXPECTED_LEFT_GROUP);
        });

        it('should handle CREATE_USER', () => {
            const result = Users(initialState, actionsReducer.createUser.success);
            expect(result.createdUser.loading).toBe(false);
            expect(result.createdUser.error).toBe(null);
            expect(result.createdUser.data).toEqual(UPDATE_USER_DATA);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_USERS', () => {
            const result = Users(initialState, actionsReducer.uploadUsers.fail);
            expect(result.users.loading).toBe(false);
            expect(result.users.error).toBe('Error Message');
        });

        it('should handle GET_USER', () => {
            const result = Users(initialState, actionsReducer.uploadUser.fail);
            expect(result.user.loading).toBe(false);
            expect(result.user.error).toBe('Error Message');
        });

        it('should handle LOGIN_USER', () => {
            const result = Users(initialState, actionsReducer.loginUser.fail);
            expect(result.loggedUser.loading).toBe(false);
            expect(result.loggedUser.error).toBe('Error Message');
        });

        it('should handle UPDATE_USER', () => {
            const result = Users(initialState, actionsReducer.updateUser.fail);
            expect(result.updatedUser.loading).toBe(false);
            expect(result.updatedUser.error).toBe('Error Message');
        });

        it('should handle REMOVE_USER', () => {
            const result = Users(initialState, actionsReducer.removeUser.fail);
            expect(result.removedUser.loading).toBe(false);
            expect(result.removedUser.error).toBe('Error Message');
        });

        it('should handle USER_JOIN_GROUP', () => {
            const result = Users(initialState, actionsReducer.userJoinGroup.fail);
            expect(result.userJoinedGroup.loading).toBe(false);
            expect(result.userJoinedGroup.error).toBe('Error Message');
        });

        it('should handle USER_LEAVE_GROUP', () => {
            const result = Users(initialState, actionsReducer.userLeaveGroup.fail);
            expect(result.userLeftGroup.loading).toBe(false);
            expect(result.userLeftGroup.error).toBe('Error Message');
        });

        it('should handle CREATE_USER', () => {
            const result = Users(initialState, actionsReducer.createUser.fail);
            expect(result.createdUser.loading).toBe(false);
            expect(result.createdUser.error).toBe('Error Message');
        });
    });
});
