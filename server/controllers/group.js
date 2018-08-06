import Group from '../models/group/group';
import User from '../models/user/user';
import commonCrudOperations from '../services/commonCrudOperations';

export const getGroups = commonCrudOperations.getAll(Group, User, 'users');

export const getGroupByID = commonCrudOperations.getByID(Group, User, 'users');

export const createGroup = commonCrudOperations.create(Group);

export const updateGroup = commonCrudOperations.update(Group, User, 'users');

export const removeGroup = commonCrudOperations.remove(Group, User, 'users');

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();
