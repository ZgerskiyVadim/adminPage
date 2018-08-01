import {
    GROUP_CREATED,
    CREATE_GROUP_REQUEST_FAILED
} from '../actions';

const initialState = {
    isGroupCreated: false,
    error: null
};

export default function createGroupReducer(state = initialState, action) {
    switch (action.type) {
        case GROUP_CREATED:
            return {
                ...state,
                isGroupCreated: true,
                error: null
            };

        case CREATE_GROUP_REQUEST_FAILED:
            return {
                ...state,
                isGroupCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
