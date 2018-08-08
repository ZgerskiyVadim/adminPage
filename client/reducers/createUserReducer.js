import {
    USER_CREATED,
    USER_CREATE_REQUEST,
    CREATE_USER_REQUEST_FAILED
} from '../actions';

const defaultProps = {
    isLoading: false,
    error: null
};

const initialState = {
    isUserCreated: false,
    ...defaultProps
};

export default function CreateUser(state = initialState, action) {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        case USER_CREATED:
            return {
                ...state,
                ...defaultProps,
                isUserCreated: true
            };

        case CREATE_USER_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                isUserCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
