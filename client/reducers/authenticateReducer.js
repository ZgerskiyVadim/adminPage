import {
    USER_LOGGED,
    LOGIN_REQUEST,
    USER_LOGOUT,
    LOGOUT_REQUEST,
    AUTHENTICATE_REQUEST_FAILED
} from '../actions';

const defaultProps = {
    isLogged: false,
    isLogout: false,
    isLoading: false,
    error: null
};

const initialState = {
    ...defaultProps
};

export default function Authenticate(state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED:
            return {
                ...state,
                ...defaultProps,
                isLogged: true
            };

        case USER_LOGOUT:
            return {
                ...state,
                ...defaultProps,
                isLogout: true,
            };

        case LOGIN_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        case LOGOUT_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        case AUTHENTICATE_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
