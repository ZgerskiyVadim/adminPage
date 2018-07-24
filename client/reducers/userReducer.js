import {
    GET_USER,
    UPDATE_USER,
    USER_LEAVE_GROUP,
    IS_JOINING_GROUP
} from '../actions';

const initialState = {
    user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        _id: ''
    },
    groups: [],
    joiningGroup: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload.user,
                groups: action.payload.groups
            };

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        case USER_LEAVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload._id)
            };

        case IS_JOINING_GROUP:
            return {
                ...state,
                joiningGroup: action.payload
            };

        default: return state
    }
}
