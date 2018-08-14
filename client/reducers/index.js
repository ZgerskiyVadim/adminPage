import { combineReducers } from 'redux';
import {Groups} from './groupsReducer';
import {Users} from './usersReducer';
import {CreateUser} from './createUserReducer';
import {CreateGroup} from './createGroupReducer';

const rootReducer = combineReducers({
    Groups,
    Users,
    CreateUser,
    CreateGroup
});

export default rootReducer;
