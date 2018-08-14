import { Groups, initialState } from '../../groupsReducer';

import {
    actionsReducer,
    UPLOAD_GROUPS,
    UPLOAD_GROUP,
    UPDATE_GROUP_DATA,
    REMOVE_GROUP_DATA
} from './fixture';

describe('Groups reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_GROUPS', () => {
            const result = Groups(initialState, actionsReducer.uploadGroups.pending);
            expect(result.groups.loading).toBe(true);
            expect(result.groups.error).toBe(null);
        });

        it('should handle GET_GROUP', () => {
            const result = Groups(initialState, actionsReducer.uploadGroup.pending);
            expect(result.group.loading).toBe(true);
            expect(result.group.error).toBe(null);
        });

        it('should handle UPDATE_GROUP', () => {
            const result = Groups(initialState, actionsReducer.updateGroup.pending);
            expect(result.updatedGroup.loading).toBe(true);
            expect(result.updatedGroup.error).toBe(null);
        });

        it('should handle REMOVE_GROUP', () => {
            const result = Groups(initialState, actionsReducer.removeGroup.pending);
            expect(result.removedGroup.loading).toBe(true);
            expect(result.removedGroup.error).toBe(null);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_GROUPS', () => {
            const result = Groups(initialState, actionsReducer.uploadGroups.success);
            expect(result.groups.loading).toBe(false);
            expect(result.groups.error).toBe(null);
            expect(result.groups.data).toEqual(UPLOAD_GROUPS);
        });

        it('should handle GET_GROUP', () => {
            const result = Groups(initialState, actionsReducer.uploadGroup.success);
            expect(result.group.loading).toBe(false);
            expect(result.group.error).toBe(null);
            expect(result.group.data).toEqual(UPLOAD_GROUP);
        });

        it('should handle UPDATE_GROUP', () => {
            const result = Groups(initialState, actionsReducer.updateGroup.success);
            expect(result.updatedGroup.loading).toBe(false);
            expect(result.updatedGroup.error).toBe(null);
            expect(result.updatedGroup.data).toEqual(UPDATE_GROUP_DATA);
        });

        it('should handle REMOVE_GROUP', () => {
            const result = Groups(initialState, actionsReducer.removeGroup.success);
            expect(result.removedGroup.loading).toBe(false);
            expect(result.removedGroup.error).toBe(null);
            expect(result.groups.data.length).toEqual(0);
            expect(result.removedGroup.data).toEqual(REMOVE_GROUP_DATA);
        });
    });
    describe('Error cases:', () => {
        it('should handle GET_GROUPS', () => {
            const result = Groups(initialState, actionsReducer.uploadGroups.fail);
            expect(result.groups.loading).toBe(false);
            expect(result.groups.error).toBe('Error Message');
        });

        it('should handle GET_GROUP', () => {
            const result = Groups(initialState, actionsReducer.uploadGroup.fail);
            expect(result.group.loading).toBe(false);
            expect(result.group.error).toBe('Error Message');
        });

        it('should handle UPDATE_GROUP', () => {
            const result = Groups(initialState, actionsReducer.updateGroup.fail);
            expect(result.updatedGroup.loading).toBe(false);
            expect(result.updatedGroup.error).toBe('Error Message');
        });

        it('should handle REMOVE_GROUP', () => {
            const result = Groups(initialState, actionsReducer.removeGroup.fail);
            expect(result.removedGroup.loading).toBe(false);
            expect(result.removedGroup.error).toBe('Error Message');
        });
    });
});
