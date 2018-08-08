import {
    USER_LOGGED_SUCCESS,
    LOGIN_PENDING,
    USER_LOGOUT_SUCCESS,
    LOGOUT_PENDING,
    AUTHENTICATE_FAILED
} from '../actions';

const defaultProps = {
    isLogged: false,
    isLogout: false,
    loading: false,
    error: null
};

const initialState = {
    ...defaultProps
};

export default function Authenticate(state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                isLogged: true
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                isLogout: true,
            };

        case LOGIN_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case LOGOUT_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case AUTHENTICATE_FAILED:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
