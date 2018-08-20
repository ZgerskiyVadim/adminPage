import {
    GET_USERS_PENDING,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    REMOVE_USER_PENDING,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAIL,
    GET_USER_SUCCESS,
    GET_USER_PENDING,
    GET_USER_FAIL,
    USER_CREATED_SUCCESS,
    USER_CREATE_PENDING,
    CREATE_USER_FAIL,
    IS_USER_WANT_JOIN_GROUP,
    USER_JOIN_GROUP_PENDING,
    USER_JOIN_GROUP_SUCCESS,
    USER_JOIN_GROUP_FAIL,
    USER_LEAVE_GROUP_PENDING,
    USER_LEAVE_GROUP_SUCCESS,
    USER_LEAVE_GROUP_FAIL
} from "../../../actions";


export const UPLOAD_USER = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@email.com',
    password: 'password',
    _id: 1,
    groups: [{_id: 1}, {_id: 2}]
};

export const UPLOAD_USERS = [
    UPLOAD_USER
];

export const UPDATE_USER_DATA = {
    username: 'updated-username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@email.com',
    password: 'password',
    _id: 1
};

export const JOIN_GROUP_DATA = {
    group: {
        _id: 1
    }
};

export const EXPECTED_JOIN_GROUP = {
    groups: [{...UPLOAD_USER.groups[0], isLeftGroup: false}, {...UPLOAD_USER.groups[1]}]
};

export const EXPECTED_LEFT_GROUP = {
    groups: [{...UPLOAD_USER.groups[0], isLeftGroup: true}, {...UPLOAD_USER.groups[1]}]
};

export const REMOVE_USER_DATA = {
    _id: 1
};

export const actionsReducer = {
    uploadUsers: {
        pending: {
            type: GET_USERS_PENDING,
        },
        success: {
            type: GET_USERS_SUCCESS,
            payload: UPLOAD_USERS,
        },
        fail: {
            type: GET_USERS_FAIL,
            payload: 'Error Message',
        },
    },

    uploadUser: {
        pending: {
            type: GET_USER_PENDING,
        },
        success: {
            type: GET_USER_SUCCESS,
            payload: UPLOAD_USER,
        },
        fail: {
            type: GET_USER_FAIL,
            payload: 'Error Message',
        },
    },

    updateUser: {
        pending: {
            type: UPDATE_USER_PENDING
        },
        success: {
            type: UPDATE_USER_SUCCESS,
            payload: UPDATE_USER_DATA
        },
        fail: {
            type: UPDATE_USER_FAIL,
            payload: 'Error Message',
        },
    },

    removeUser: {
        pending: {
            type: REMOVE_USER_PENDING
        },
        success: {
            type: REMOVE_USER_SUCCESS,
            payload: REMOVE_USER_DATA
        },
        fail: {
            type: REMOVE_USER_FAIL,
            payload: 'Error Message',
        },
    },
    createUser: {
        pending: {
            type: USER_CREATE_PENDING
        },
        success: {
            type: USER_CREATED_SUCCESS,
            payload: UPDATE_USER_DATA
        },
        fail: {
            type: CREATE_USER_FAIL,
            payload: 'Error Message',
        },
    },
    userJoinGroup: {
        pending: {
            type: USER_JOIN_GROUP_PENDING
        },
        success: {
            type: USER_JOIN_GROUP_SUCCESS,
            payload: JOIN_GROUP_DATA
        },
        fail: {
            type: USER_JOIN_GROUP_FAIL,
            payload: 'Error Message',
        },
    },
    userLeaveGroup: {
        pending: {
            type: USER_LEAVE_GROUP_PENDING
        },
        success: {
            type: USER_LEAVE_GROUP_SUCCESS,
            payload: {
                group: {
                    _id: 1
                }
            }
        },
        fail: {
            type: USER_LEAVE_GROUP_FAIL,
            payload: 'Error Message',
        },
    },
    userIsJoiningGroups: {
        success: {
            type: IS_USER_WANT_JOIN_GROUP,
            payload: true
        },
    },
};
