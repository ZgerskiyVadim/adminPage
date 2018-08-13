import { User, initialState } from '../../userReducer';

import {
    actionsReducer,
    UPLOAD_USER,
    UPDATE_USER_DATA
} from './fixture';

describe('User reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_USER', () => {
            const result = User(initialState, actionsReducer.uploadUser.pending);
            expect(result.user.loading).toBe(true);
            expect(result.user.error).toBe(null);
        });

        it('should handle UPDATE_USER', () => {
            const result = User(initialState, actionsReducer.updateUser.pending);
            expect(result.updatedUser.loading).toBe(true);
            expect(result.updatedUser.error).toBe(null);
        });
    });
    describe('Success cases:', () => {
        it('should handle GET_USER', () => {
            const result = User(initialState, actionsReducer.uploadUser.success);
            expect(result.user.loading).toBe(false);
            expect(result.user.error).toBe(null);
            expect(result.user.data).toEqual(UPLOAD_USER);
        });

        it('should handle UPDATE_USER', () => {
            const result = User(initialState, actionsReducer.updateUser.success);
            expect(result.updatedUser.loading).toBe(false);
            expect(result.updatedUser.error).toBe(null);
            expect(result.user.data).toEqual(UPDATE_USER_DATA);
            expect(result.updatedUser.data).toEqual(UPDATE_USER_DATA);
        });
    });
    describe('Error cases:', () => {
        it('should handle GET_USER', () => {
            const result = User(initialState, actionsReducer.uploadUser.fail);
            expect(result.user.loading).toBe(false);
            expect(result.user.error).toBe('Error Message');
        });

        it('should handle UPDATE_USER', () => {
            const result = User(initialState, actionsReducer.updateUser.fail);
            expect(result.updatedUser.loading).toBe(false);
            expect(result.updatedUser.error).toBe('Error Message');
        });
    });
});
