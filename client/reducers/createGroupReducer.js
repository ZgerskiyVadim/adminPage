import {
    GROUP_CREATED_SUCCESS,
    GROUP_CREATE_PENDING,
    CREATE_GROUP_FAIL
} from '../actions';

export const initialState = {
    isGroupCreated: false,
    loading: false,
    error: null
};

export function CreateGroup(state = initialState, action) {
    switch (action.type) {
        case GROUP_CREATE_PENDING:
            return {
                ...state,
                isGroupCreated: false,
                error: null,
                loading: true
            };

        case GROUP_CREATED_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                isGroupCreated: true,
            };

        case CREATE_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                isGroupCreated: false,
                error: action.payload || 'Create group failed'
            };
        default: return state;
    }
}
