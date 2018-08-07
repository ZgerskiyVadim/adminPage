import User from '../models/user';
import Group from '../models/group';
import commonCrudOperations from '../services/commonCrudOperations';
import config from '../../config';

const options = {
    Model: User,
    searchFields: 'users',
    ModelPopulateOrUpdate: Group,
    pathPopulate: 'groups',
};

export const getUsers = commonCrudOperations.getAll(options);

export const getUserByID = commonCrudOperations.getByID(options);

export const createUser = commonCrudOperations.create(User);

export const updateUser = commonCrudOperations.update(options);

export const removeUser = commonCrudOperations.remove(options);

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