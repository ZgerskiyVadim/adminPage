import * as actions from '../actions/constants';

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
        case actions.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                groups: action.payload.groups
            };

        case actions.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        case actions.USER_UPDATE_GROUPS:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload._id)
            };

        case actions.IS_JOINING_GROUP:
            return {
                ...state,
                joiningGroup: action.payload
            };

        default: return state
    }
}
