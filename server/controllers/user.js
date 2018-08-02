import User from '../models/user/user';
import Group from '../models/group/group';
import {CommonCrudOperations} from '../services/commonCrudOperations';
const commonCrudOperations = new CommonCrudOperations();

export const getUsers = commonCrudOperations.getAll(User, Group, 'groups');

export const getUserByID = commonCrudOperations.getByID(User, Group, 'groups');

export const createUser = commonCrudOperations.create(User);

export const updateUser = commonCrudOperations.update(User, Group, 'groups');

export const removeUser = commonCrudOperations.remove(User, Group, 'groups');

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();

export const addUserInGroup = commonCrudOperations.addUserInGroup();
