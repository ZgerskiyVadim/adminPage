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

const userController = new UserController();

export const getUsers = userController.getAll();

export const getUserByID = userController.getByID();

export const createUser = userController.create();

export const updateUser = userController.update();

export const removeUser = userController.remove();

export const removeUserFromGroup = userController.removeUserFromGroup();

export const addUserInGroup = userController.addUserInGroup();

export const login = (req, done) => {
    done(null, {message: 'User logged-in'})
};

export const logout = (done) => {
    done({message: 'User is logout'});
};