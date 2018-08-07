import User from '../models/user';
import Group from '../models/group';
import commonCrudOperations from '../services/commonCrudOperations';
import config from '../../config';

export const getUsers = commonCrudOperations.getAll(User, Group, 'groups');

export const getUserByID = commonCrudOperations.getByID(User, Group, 'groups');

export const createUser = commonCrudOperations.create(User);

export const updateUser = commonCrudOperations.update(User, Group, 'groups');

export const removeUser = commonCrudOperations.remove(User, Group, 'groups');

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();

export const addUserInGroup = commonCrudOperations.addUserInGroup();

export const login = (req, res, done) => {
    res.json({
        message: 'User loggedIN'
    })
};

export const logout = (req, res, done) => {
    res.clearCookie(config.sessionName)
        .status(200)
        .json({
            message: 'User is logout'
        });
};