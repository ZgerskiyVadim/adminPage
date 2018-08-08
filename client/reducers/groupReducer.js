import {
    GET_GROUP_SUCCESS,
    GET_GROUP_PENDING,
    GROUP_FAIL,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_PENDING
} from '../actions';

const defaultProps = {
    isUpdated: false,
    loading: false,
    error: null
};

const initialState = {
    name: '',
    title: '',
    users: [],
    ...defaultProps
};

export default function Group(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GET_GROUP_SUCCESS:
            return {
                ...state,
                ...action.payload,
                ...defaultProps
            };

        case UPDATE_GROUP_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                name: action.payload.name,
                title: action.payload.title,
                users: action.payload.users,
                isUpdated: true,
            };

        case GROUP_FAIL:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
