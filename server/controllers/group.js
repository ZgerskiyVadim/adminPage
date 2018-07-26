import createError from '../services/error';
import Group from '../models/group/group';
import User from '../models/user/user';
import * as commonCrudOperations from '../services/commonCrudOperations';


export const getGroups = commonCrudOperations.getAll(Group, User);

export const createGroup = commonCrudOperations.create(Group);

export const updateGroup = commonCrudOperations.update(Group);

export const removeGroup = commonCrudOperations.remove(Group);

export const removeUserFromGroup = commonCrudOperations.removeFromGroup(Group, User);

export function getGroupByID(req, res, done) {
    Group.findOne({_id: req.params.id}, (err, group) => {
        if (!group) return done(createError('Not Found', 404));
        if (err) return done(err);
        User.populate(group, {path: 'users'}, (err, docs) => {
            if (err) return done(err);
            res.json(docs);
        });
    });
}
