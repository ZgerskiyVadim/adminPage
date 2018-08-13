import { Group, initialState } from '../../groupReducer';

import {
    actionsReducer,
    UPLOAD_GROUP,
    UPDATE_GROUP_DATA
} from './fixture';

describe('Group reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_GROUP', () => {
            const result = Group(initialState, actionsReducer.uploadGroup.pending);
            expect(result.group.loading).toBe(true);
            expect(result.group.error).toBe(null);
        });

        it('should handle UPDATE_GROUP', () => {
            const result = Group(initialState, actionsReducer.updateGroup.pending);
            expect(result.updatedGroup.loading).toBe(true);
            expect(result.updatedGroup.error).toBe(null);
        });
    });
    describe('Success cases:', () => {
        it('should handle GET_GROUP', () => {
            const result = Group(initialState, actionsReducer.uploadGroup.success);
            expect(result.group.loading).toBe(false);
            expect(result.group.error).toBe(null);
            expect(result.group.data).toEqual(UPLOAD_GROUP);
        });

        it('should handle UPDATE_GROUP', () => {
            const result = Group(initialState, actionsReducer.updateGroup.success);
            expect(result.updatedGroup.loading).toBe(false);
            expect(result.updatedGroup.error).toBe(null);
            expect(result.group.data).toEqual(UPDATE_GROUP_DATA);
            expect(result.updatedGroup.data).toEqual(UPDATE_GROUP_DATA);
        });
    });
    describe('Error cases:', () => {
        it('should handle GET_GROUP', () => {
            const result = Group(initialState, actionsReducer.uploadGroup.fail);
            expect(result.group.loading).toBe(false);
            expect(result.group.error).toBe('Error Message');
        });

        it('should handle UPDATE_GROUP', () => {
            const result = Group(initialState, actionsReducer.updateGroup.fail);
            expect(result.updatedGroup.loading).toBe(false);
            expect(result.updatedGroup.error).toBe('Error Message');
        });
    });
});
