import {
    USER_CREATED_SUCCESS,
    USER_CREATE_PENDING,
    CREATE_USER_FAIL
} from '../actions';


export const initialState = {
    createdUser: {data: {}, loading: false, error: null}
};

export function CreateUser(state = initialState, action) {
    switch (action.type) {
        case USER_CREATE_PENDING:
            return {
                ...state,
                createdUser: {
                    ...state.createdUser,
                    loading: true,
                    error: null
                }
            };

        case USER_CREATED_SUCCESS:
            return {
                ...state,
                createdUser: {
                    ...state.createdUser,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                createdUser: {
                    ...state.createdUser,
                    loading: false,
                    error: action.payload || 'Create user failed'
                }
            };
        default: return state;
    }
}
