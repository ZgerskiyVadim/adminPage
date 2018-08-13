import {
    GET_USERS_PENDING,
    GET_USERS_SUCCESS,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    REMOVE_USER_PENDING,
    REMOVE_USER_SUCCESS,
    GET_USERS_FAIL,
    UPDATE_USER_FAIL,
    REMOVE_USER_FAIL
} from '../actions';

const initialState = {
    users: {data: [], loading: false, error: null},
    updatedUser: {data: {}, loading: false, error: null},
    removedUser: {data: {}, loading: false, error: null}
};

export default function Users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_PENDING:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true,
                    error: null
                }
            };

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case GET_USERS_FAIL:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    error: action.payload
                }
            };

        case UPDATE_USER_PENDING:
            return {
                ...state,
                updatedUser: {
                    ...state.updatedUser,
                    loading: true,
                    error: null
                }
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: state.users.data.map(user => (user._id === action.payload._id) ? action.payload : user)
                },
                updatedUser: {
                    ...state.updatedUser,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case UPDATE_USER_FAIL:
            return {
                ...state,
                updatedUser: {
                    ...state.updatedUser,
                    loading: false,
                    error: action.payload
                }
            };

        case REMOVE_USER_PENDING:
            return {
                ...state,
                removedUser: {
                    ...state.removedUser,
                    loading: true,
                    error: null
                }
            };

        case REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: state.users.data.filter(user => user._id !== action.payload)
                },
                removedUser: {
                    ...state.removedUser,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case REMOVE_USER_FAIL:
            return {
                ...state,
                removedUser: {
                    ...state.removedUser,
                    loading: false,
                    error: action.payload
                }
            };

        default: return state;
    }
}
