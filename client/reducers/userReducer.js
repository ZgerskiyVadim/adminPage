import {
    GET_USER,
    UPDATE_USER,
    USER_LEAVE_GROUP,
    IS_USER_WANT_JOIN_GROUP,
    USER_REQUEST_FAILED
} from '../actions';

const initialState = {
    user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        _id: '',
        isJoiningGroup: false,
    },
    groups: [],
    isLeftGroup: false,
    isUpdated: false,
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                groups: [...action.payload.groups],
                isLeftGroup: false,
                isUpdated: false,
                error: null
            };

        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                isLeftGroup: false,
                isUpdated: true,
                error: null
            };

        case USER_LEAVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload._id),
                isLeftGroup: true,
                isUpdated: false,
                error: null
            };

        case IS_USER_WANT_JOIN_GROUP:
            return {
                ...state,
                user: {
                    ...state.user,
                    isJoiningGroup: action.payload
                },
                isLeftGroup: false,
                isUpdated: false,
                error: null
            };

        case USER_REQUEST_FAILED:
            return {
                ...state,
                isLeftGroup: false,
                isUpdated: false,
                error: action.payload
            };

        default: return state;
    }
}
