import async from "async";
import createError from '../services/error';
import User from '../models/user/user';
import Group from "../models/group/group";
import * as commonCrudOperations from '../services/commonCrudOperations';


export const getUsers = commonCrudOperations.getAll(User);

export const createUser = commonCrudOperations.create(User);

export const updateUser = commonCrudOperations.update(User);

export const removeUser = commonCrudOperations.remove(User, Group);

export const removeUserFromGroup = commonCrudOperations.removeFromGroup(Group);

export function getUserByID(req, res, done) {
    async.waterfall([
            next => {
                User.findOne({_id: req.params.id}, (err, user) => {
                    if (!user) return done(createError('Not Found', 404));
                    if (err) return done(err);
                    next(null, user)
                })
            },
            (user, next) => {
                Group.find({users: user.id}, (err, groups) => {
                    if (err) return done(err);
                    next(user, groups)
                })
            }
        ], (user, groups) => res.json({ user, groups })
    );
}

export function addUserInGroup(req, res, done) {
    const {userID, groupID} = req.body;

    async.waterfall([
        next => {
            User.findOne({_id: userID}, (err, user) => {
                if (!user) return done(createError('User is not found', 404));
                if (err) return done(err);
                next();
            })
        },
        next => {
            Group.findOneAndUpdate({_id: groupID}, { $push: { users: userID } }, {new: true}, (err, updatedGroup) => {
                if (!updatedGroup) return done(createError('Group is not found', 404));
                if (err) return done(err);
                next(updatedGroup);
            })
        }
    ], updatedGroup => res.json(updatedGroup));
}