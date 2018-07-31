import {
    GROUP_CREATED,
    CREATE_GROUP_REQUEST_FAILED
} from '../actions';

const initialState = {
    groupCreated: false,
    error: null
};

export default function createGroupReducer(state = initialState, action) {
    switch (action.type) {
        case GROUP_CREATED:
            return {
                ...state,
                groupCreated: true,
                error: null
            };

        case CREATE_GROUP_REQUEST_FAILED:
            return {
                ...state,
                groupCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
