import { combineReducers } from 'redux';
import Groups from './groupsReducer';
import Group from './groupReducer';
import Users from './usersReducer';
import User from './userReducer';
import CreateUser from './createUserReducer';
import CreateGroup from './createGroupReducer';
import Authenticate from './authenticateReducer';

const rootReducer = combineReducers({
    Authenticate,
    Groups,
    Group,
    Users,
    User,
    CreateUser,
    CreateGroup
});

export default rootReducer;
