import { Users, initialState } from '../../usersReducer';

import {
    actionsReducer,
    UPLOAD_USERS,
    UPDATE_USER_DATA,
    REMOVE_USER_DATA
} from './fixture';

describe('Users reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_USERS', () => {
            const result = Users(initialState, actionsReducer.uploadUsers.pending);
            expect(result.users.loading).toBe(true);
            expect(result.users.error).toBe(null);
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
    });

    describe('Success cases:', () => {
        it('should handle GET_USERS', () => {
            const result = Users(initialState, actionsReducer.uploadUsers.success);
            expect(result.users.loading).toBe(false);
            expect(result.users.error).toBe(null);
            expect(result.users.data).toEqual(UPLOAD_USERS);
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
    });
    describe('Error cases:', () => {
        it('should handle GET_USERS', () => {
            const result = Users(initialState, actionsReducer.uploadUsers.fail);
            expect(result.users.loading).toBe(false);
            expect(result.users.error).toBe('Error Message');
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
    });
});
