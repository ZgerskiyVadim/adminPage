import {
    GET_USER,
    UPDATE_USER,
    USER_LEFT_GROUP,
    USER_JOINED_GROUP,
    IS_USER_WANT_JOIN_GROUP,
    USER_REQUEST_FAILED
} from '../actions';

const defaultProps = {
    isJoinedGroup: false,
    isLeftGroup: false,
    isUpdated: false,
    error: null
};

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
    ...defaultProps
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
                ...defaultProps
            };

        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                ...defaultProps,
                isUpdated: true,
            };

        case USER_JOINED_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => group._id === action.payload._id ? {...action.payload, isLeftGroup: false} : group),
                ...defaultProps,
                isJoinedGroup: true,
            };

        case USER_LEFT_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => group._id === action.payload._id ? {...action.payload, isLeftGroup: true} : group),
                ...defaultProps,
                isLeftGroup: true,
            };

        case IS_USER_WANT_JOIN_GROUP:
            return {
                ...state,
                user: {
                    ...state.user,
                    isJoiningGroup: action.payload
                },
                ...defaultProps
            };

        case USER_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
