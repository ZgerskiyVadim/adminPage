import {
    GET_USER_SUCCESS,
    GET_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_PENDING,
    USER_LEAVE_GROUP_SUCCESS,
    USER_LEAVE_GROUP_PENDING,
    USER_JOIN_GROUP_SUCCESS,
    USER_JOIN_GROUP_FAIL,
    USER_JOIN_GROUP_PENDING,
    IS_USER_WANT_JOIN_GROUP,
    GET_USER_FAIL,
    UPDATE_USER_FAIL,
    USER_LEAVE_GROUP_FAIL
} from '../actions';

export const initialState = {
    user: {data: {}, loading: false, error: null, isJoiningGroup: false},
    updatedUser: {data: {}, loading: false, error: null},
    userJoinedGroup: {date: {}, loading: false, error: null},
    userLeftGroup: {date: {}, loading: false, error: null}
};

export function User(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PENDING:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true,
                    isJoiningGroup: false,
                    error: null
                }
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload,
                    isJoiningGroup: false,
                    loading: false,
                    error: null
                }
            };

        case GET_USER_FAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    isJoiningGroup: false,
                    error: action.payload || 'Get user failed'
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
                user: {
                    ...state.user,
                    data: action.payload
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
                    error: action.payload || 'Update user failed'
                }
            };

        case USER_JOIN_GROUP_PENDING:
            return {
                ...state,
                userJoinedGroup: {
                    ...state.userJoinedGroup,
                    loading: true,
                    error: null
                }
            };

        case USER_JOIN_GROUP_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...action.payload.user,
                        groups: state.user.data.groups.map(group => group._id === action.payload.group._id ? {...action.payload.group, isLeftGroup: false} : group)
                    }
                },
                userJoinedGroup: {
                    ...state.userJoinedGroup,
                    data: action.payload.user,
                    loading: false,
                    error: false
                },
            };

        case USER_JOIN_GROUP_FAIL:
            return {
                ...state,
                userJoinedGroup: {
                    ...state.userJoinedGroup,
                    loading: false,
                    error: action.payload || 'User join group failed'
                }
            };

        case USER_LEAVE_GROUP_PENDING:
            return {
                ...state,
                userLeftGroup: {
                    ...state.userLeftGroup,
                    loading: true,
                    error: null
                }
            };

        case USER_LEAVE_GROUP_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...action.payload.user,
                        groups: state.user.data.groups.map(group => group._id === action.payload.group._id ? {...action.payload.group, isLeftGroup: true} : group)
                    }
                },
                userLeftGroup: {
                    ...state.userLeftGroup,
                    data: action.payload.user,
                    loading: false,
                    error: false
                },
            };

        case USER_LEAVE_GROUP_FAIL:
            return {
                ...state,
                userLeftGroup: {
                    ...state.userLeftGroup,
                    loading: false,
                    error: action.payload || 'User leave group failed'
                }
            };

        case IS_USER_WANT_JOIN_GROUP:
            return {
                ...state,
                user: {
                    ...state.user,
                    isJoiningGroup: action.payload
                }
            };

        default: return state;
    }
}
