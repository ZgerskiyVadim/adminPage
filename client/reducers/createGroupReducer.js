import {
    GROUP_CREATED_SUCCESS,
    GROUP_CREATE_PENDING,
    CREATE_GROUP_FAIL
} from '../actions';

const defaultProps = {
    loading: false,
    error: null
};

const initialState = {
    isGroupCreated: false,
    ...defaultProps
};

export default function CreateGroup(state = initialState, action) {
    switch (action.type) {
        case GROUP_CREATE_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GROUP_CREATED_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                isGroupCreated: true,
            };

        case CREATE_GROUP_FAIL:
            return {
                ...state,
                ...defaultProps,
                isGroupCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
