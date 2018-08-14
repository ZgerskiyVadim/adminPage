import {
    GET_GROUPS_PENDING,
    GET_GROUPS_SUCCESS,
    UPDATE_GROUP_PENDING,
    UPDATE_GROUP_SUCCESS,
    REMOVE_GROUP_PENDING,
    REMOVE_GROUP_SUCCESS,
    GET_GROUPS_FAIL,
    UPDATE_GROUP_FAIL,
    REMOVE_GROUP_FAIL,
    GET_GROUP_SUCCESS,
    GET_GROUP_FAIL,
    GET_GROUP_PENDING
} from '../actions';

export const initialState = {
    groups: {data: [], loading: false, error: null},
    group: {data: {}, loading: false, error: null},
    updatedGroup: {data: {}, loading: false, error: null},
    removedGroup: {data: {}, loading: false, error: null}
};

export function Groups(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS_PENDING:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    loading: true,
                    error: null
                }
            };

        case GET_GROUPS_SUCCESS:
            return {
                ...state,
                groups: {
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case GET_GROUPS_FAIL:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    loading: false,
                    error: action.payload || 'Get groups failed'
                }
            };

        case GET_GROUP_PENDING:
            return {
                ...state,
                group: {
                    ...state.group,
                    loading: true,
                    error: null
                }
            };

        case GET_GROUP_SUCCESS:
            return {
                ...state,
                group: {
                    ...state.group,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case GET_GROUP_FAIL:
            return {
                ...state,
                group: {
                    ...state.group,
                    loading: false,
                    error: action.payload || 'Get group failed'
                }
            };

        case UPDATE_GROUP_PENDING:
            return {
                ...state,
                updatedGroup: {
                    ...state.updatedGroup,
                    loading: true,
                    error: null
                }
            };

        case UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: state.groups.data.map(group => (group._id === action.payload._id) ? action.payload : group)
                },
                group: {
                    ...state.group,
                    data: action.payload
                },
                updatedGroup: {
                    ...state.updatedGroup,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case UPDATE_GROUP_FAIL:
            return {
                ...state,
                updatedGroup: {
                    ...state.updatedGroup,
                    loading: false,
                    error: action.payload || 'Update group failed'
                }
            };

        case REMOVE_GROUP_PENDING:
            return {
                ...state,
                removedGroup: {
                    ...state.removedGroup,
                    loading: true,
                    error: null
                }
            };

        case REMOVE_GROUP_SUCCESS:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: state.groups.data.filter(group => group._id !== action.payload._id)
                },
                removedGroup: {
                    ...state.removedGroup,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case REMOVE_GROUP_FAIL:
            return {
                ...state,
                removedGroup: {
                    ...state.removedGroup,
                    loading: false,
                    error: action.payload || 'Remove group failed'
                }
            };

        default: return state;
    }
}
