import {
    GET_GROUP_SUCCESS,
    GET_GROUP_PENDING,
    GET_GROUP_FAIL,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_PENDING,
    UPDATE_GROUP_FAIL
} from '../actions';

const initialState = {
    group: {data: {}, loading: false, error: null},
    updatedGroup: {data: {}, loading: false, error: null}
};

export default function Group(state = initialState, action) {
    switch (action.type) {
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
                    data: {...action.payload},
                    loading: false,
                    error: false
                }
            };

        case GET_GROUP_FAIL:
            return {
                ...state,
                group: {
                    ...state.group,
                    loading: false,
                    error: action.payload
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
                updatedGroup: {
                    ...state.updatedGroup,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };

        case UPDATE_GROUP_FAIL:
            return {
                ...state,
                updatedGroup: {
                    ...state.updatedGroup,
                    loading: false,
                    error: action.payload
                }
            };

        default: return state;
    }
}
