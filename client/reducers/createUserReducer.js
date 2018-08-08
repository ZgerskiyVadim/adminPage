import {
    USER_CREATED_SUCCESS,
    USER_CREATE_PENDING,
    CREATE_USER_FAIL
} from '../actions';

const defaultProps = {
    loading: false,
    error: null
};

const initialState = {
    isUserCreated: false,
    ...defaultProps
};

export default function CreateUser(state = initialState, action) {
    switch (action.type) {
        case USER_CREATE_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case USER_CREATED_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                isUserCreated: true
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                ...defaultProps,
                isUserCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
