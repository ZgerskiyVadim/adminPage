import {
    GET_USERS_PENDING,
    GET_USERS_SUCCESS,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    REMOVE_USER_PENDING,
    REMOVE_USER_SUCCESS,
    GET_USERS_FAIL,
    UPDATE_USER_FAIL,
    REMOVE_USER_FAIL,
    GET_USER_SUCCESS,
    GET_USER_PENDING,
    GET_USER_FAIL,
    USER_LEAVE_GROUP_PENDING,
    USER_LEAVE_GROUP_FAIL,
    USER_JOIN_GROUP_SUCCESS,
    IS_USER_WANT_JOIN_GROUP,
    USER_JOIN_GROUP_FAIL,
    USER_LEAVE_GROUP_SUCCESS,
    USER_JOIN_GROUP_PENDING,
    USER_CREATE_PENDING,
    USER_CREATED_SUCCESS,
    CREATE_USER_FAIL
} from '../actions';

export const initialState = {
    users: {data: [], loading: false, error: null},
    user: {data: {}, loading: false, error: null, isJoiningGroup: false},
    updatedUser: {data: {}, loading: false, error: null},
    removedUser: {data: {}, loading: false, error: null},
    userJoinedGroup: {data: {}, loading: false, error: null},
    userLeftGroup: {data: {}, loading: false, error: null},
    createdUser: {data: {}, loading: false, error: null}
};

export function Users(state = initialState, action) {
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
                    data: state.users.data.filter(user => user._id !== action.payload._id)
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

        case USER_CREATE_PENDING:
            return {
                ...state,
                createdUser: {
                    ...state.createdUser,
                    loading: true,
                    error: null
                }
            };

        case USER_CREATED_SUCCESS:
            return {
                ...state,
                createdUser: {
                    ...state.createdUser,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                createdUser: {
                    ...state.createdUser,
                    loading: false,
                    error: action.payload || 'Create user failed'
                }
            };

        default: return state;
    }
}
