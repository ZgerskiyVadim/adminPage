import {
    USER_CREATED_SUCCESS,
    USER_CREATE_PENDING,
    CREATE_USER_FAIL
} from '../actions';


const initialState = {
    isUserCreated: false,
    loading: false,
    error: null
};

export default function CreateUser(state = initialState, action) {
    switch (action.type) {
        case USER_CREATE_PENDING:
            return {
                ...state,
                isUserCreated: false,
                error: null,
                loading: true
            };

        case USER_CREATED_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isUserCreated: true
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                isUserCreated: false,
                loading: false,
                error: action.payload || 'Create user failed'
            };
        default: return state;
    }
}
