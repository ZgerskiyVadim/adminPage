import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_PENDING,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_PENDING,
    USER_LOGIN_FAIL,
    USER_LOGOUT_FAIL
} from '../actions';


const initialState = {
    isLogged: false,
    loading: false,
    error: null
};

export default function Authenticate(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_PENDING:
            return {
                ...state,
                isLogged: false,
                error: null,
                loading: true
            };

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isLogged: true
            };

        case USER_LOGIN_FAIL:
            return {
                ...state,
                isLogged: false,
                loading: false,
                error: action.payload || 'User login failed'
            };

        case USER_LOGOUT_PENDING:
            return {
                ...state,
                isLogged: false,
                error: null,
                loading: true
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogged: false,
                error: null,
                loading: false
            };

        case USER_LOGOUT_FAIL:
            return {
                ...state,
                isLogged: false,
                loading: false,
                error: action.payload || 'User logout failed'
            };

        default: return state;
    }
}
