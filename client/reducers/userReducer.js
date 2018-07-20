import * as types from '../actions';

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
        case types.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                groups: action.payload.groups
            };

        case types.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        case types.USER_UPDATE_GROUPS:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload._id)
            };

        case types.IS_JOINING_GROUP:
            return {
                ...state,
                joiningGroup: action.payload
            };

        default: return state
    }
}
