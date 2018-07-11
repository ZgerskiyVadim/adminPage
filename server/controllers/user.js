import async from "async";
import createError from '../libs/error';
import User from '../models/user/user';
import Group from "../models/group/group";

export function getUsers(req, res, done) {
    const { skip, limit, searchBy} = req.query;

    if (searchBy) {
        User.find({'$or': [
                {username: {$regex: searchBy}},
                {firstName: {$regex: searchBy}},
                {lastName: {$regex: searchBy}},
                {email: {$regex: searchBy}}
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

export function createUser(req, res, done) {
    User.create(req.body, (err, newUser) => {
        if (err) return done(err);
        res.status(201).json(newUser);
    })
}

export function addUserInGroup(req, res, done) {
    const {userID, groupID} = req.params;

    async.waterfall([
        next => {
            User.findOne({_id: userID}, (err, user) => {
                if (!user) return done(createError('User is not found', 404));
                if (err) return done(err);
                next(null, user)
            })
        },
        (user, next) => {
            Group.findOneAndUpdate({_id: groupID}, { $push: { users: user._id } }, {new: true}, (err, updatedGroup) => {
                if (!updatedGroup) return done(createError('Group is not found', 404));
                if (err) return done(err);
                next(updatedGroup);
            })
        }
    ], addedUser => res.json(addedUser));
}

export function updateUser(req, res, done) {
    User.updateOne({_id: req.params.id}, req.body, {runValidators: true}, (err, modification) => {
        if (err) return done(err);
        res.json(modification);
    })
}

export function removeFromGroup(req, res, done) {
    const {groupID} = req.body.id;

    Group.findOneAndUpdate({_id: groupID}, {$pull: {users: req.params.id}}, {new: true}, (err, modification) => {
        if (err) return done(err);
        res.json(modification);
    })
}

export function removeUser(req, res, done) {
    User.findOneAndRemove({_id: req.params.id}, (err, user) => {
        if (!user) return done(createError('User already deleted', 410));
        if (err) return done(err);
        Group.update({}, {$pull: {users: user.id}}, {multi: true}, (err, modification) => {
            if (err) return done(err);
            res.json(modification);
        })
    })
}