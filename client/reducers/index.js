import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import groupReducer from './groupReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import createReducer from './createReducer';

const rootReducer = combineReducers({
    groupsReducer,
    groupReducer,
    usersReducer,
    userReducer,
    createReducer
});

export default rootReducer;
