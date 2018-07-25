import async from "async";
import createError from '../services/error';
import User from '../models/user/user';
import Group from "../models/group/group";
import * as commonCrudOperations from '../services/commonCrudOperations';


export const createUser = commonCrudOperations.create(User);

export const updateUser = commonCrudOperations.update(User);

export function getUsers(req, res, done) {
    const { skip, limit, searchBy} = req.query;

    if (searchBy) {
        User.find({'$or': [
                {username: {$regex: searchBy, $options:'i'}},
                {firstName: {$regex: searchBy, $options:'i'}},
                {lastName: {$regex: searchBy, $options:'i'}},
                {email: {$regex: searchBy, $options:'i'}}
            ]}, null, {skip: Number(skip), limit: Number(limit)}, (err, docs) => {

            if (err) return done(err);
            res.json(docs);
        })
    } else {
        User.find({}, null, {skip: Number(skip), limit: Number(limit)}, (err, users) => {
            if (err) return done(err);
            res.json(users);
        })
    }
}

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

export function removeUserFromGroup(req, res, done) {
    const {groupID} = req.body;
    const userID = req.params.id;

    Group.findOneAndUpdate({_id: groupID}, {$pull: {users: userID}}, {new: true}, (err, updatedGroup) => {
        if (err) return done(err);
        res.json(updatedGroup);
    })
}

export function removeUser(req, res, done) {
    User.findOneAndRemove({_id: req.params.id}, (err, user) => {
        if (!user) return done(createError('User is not exist', 404));
        if (err) return done(err);
        Group.update({}, {$pull: {users: user.id}}, {multi: true}, (err, modification) => {
            if (err) return done(err);
            const message = 'User successfully deleted';
            res.status(200).json(message);
        })
    })
}