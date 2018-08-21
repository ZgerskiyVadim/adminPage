import User from '../models/user';
import Group from '../models/group';
import {CommonCrudOperations} from '../services/commonCrudOperations';

class UserController extends CommonCrudOperations{
    constructor() {
        super();
        this.options = {
            Model: User,
            pathPopulate: 'groups',
            searchFields: 'users'
        };

        this.optionsRemove = {
            Model: User,
            ModelUpdate: Group,
            pathUpdate: 'users'
        };

    }
}

export const login = (req, done) => {
    done(null, {message: 'User logged-in'})
};

export const logout = (done) => {
    done({message: 'User is logout'});
};

export default new UserController();