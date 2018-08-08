import {
    GET_USER,
    GET_USER_REQUEST,
    UPDATE_USER,
    UPDATE_USER_REQUEST,
    USER_LEFT_GROUP,
    LEAVE_GROUP_REQUEST,
    USER_JOINED_GROUP,
    ADD_USER_IN_GROUP_REQUEST,
    IS_USER_WANT_JOIN_GROUP,
    USER_REQUEST_FAILED
} from '../actions';

const defaultProps = {
    isJoinedGroup: false,
    isLeftGroup: false,
    isUpdated: false,
    loading: false,
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

export default function User(state = initialState, action) {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GET_USER:
            return {
                ...state,
                ...defaultProps,
                user: {
                    ...state.user,
                    ...action.payload
                },
                groups: [...action.payload.groups],
            };

        case UPDATE_USER_REQUEST:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case UPDATE_USER:
            return {
                ...state,
                ...defaultProps,
                user: {
                    ...state.user,
                    ...action.payload
                },
                isUpdated: true,
            };

        case ADD_USER_IN_GROUP_REQUEST:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case USER_JOINED_GROUP:
            return {
                ...state,
                ...defaultProps,
                groups: state.groups.map(group => group._id === action.payload._id ? {...action.payload, isLeftGroup: false} : group),
                isJoinedGroup: true,
            };

        case LEAVE_GROUP_REQUEST:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case USER_LEFT_GROUP:
            return {
                ...state,
                ...defaultProps,
                groups: state.groups.map(group => group._id === action.payload._id ? {...action.payload, isLeftGroup: true} : group),
                isLeftGroup: true,
            };

        case IS_USER_WANT_JOIN_GROUP:
            return {
                ...state,
                ...defaultProps,
                user: {
                    ...state.user,
                    isJoiningGroup: action.payload
                },
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
