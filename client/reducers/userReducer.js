import {
    GET_USER_SUCCESS,
    GET_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_PENDING,
    USER_LEFT_GROUP_SUCCESS,
    LEAVE_GROUP_PENDING,
    USER_JOINED_GROUP_SUCCESS,
    ADD_USER_IN_GROUP_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    USER_FAIL
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
        case GET_USER_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                user: {
                    ...state.user,
                    ...action.payload
                },
                groups: [...action.payload.groups],
            };

        case UPDATE_USER_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                user: {
                    ...state.user,
                    ...action.payload
                },
                isUpdated: true,
            };

        case ADD_USER_IN_GROUP_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case USER_JOINED_GROUP_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                groups: state.groups.map(group => group._id === action.payload._id ? {...action.payload, isLeftGroup: false} : group),
                isJoinedGroup: true,
            };

        case LEAVE_GROUP_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case USER_LEFT_GROUP_SUCCESS:
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

        case USER_FAIL:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
