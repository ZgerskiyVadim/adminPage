import {
    GROUP_CREATED_SUCCESS,
    GROUP_CREATE_PENDING,
    CREATE_GROUP_FAIL
} from '../actions';

export const initialState = {
    createdGroup: {data: {}, loading: false, error: null}
};

export function CreateGroup(state = initialState, action) {
    switch (action.type) {
        case GROUP_CREATE_PENDING:
            return {
                ...state,
                createdGroup: {
                    ...state.createdGroup,
                    loading: true,
                    error: null
                }
            };

        case GROUP_CREATED_SUCCESS:
            return {
                ...state,
                createdGroup: {
                    ...state.createdGroup,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case CREATE_GROUP_FAIL:
            return {
                ...state,
                createdGroup: {
                    ...state.createdGroup,
                    loading: false,
                    error: action.payload || 'Create group failed'
                }
            };
        default: return state;
    }
}