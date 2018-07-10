import async from "async";
import createError from '../libs/error';
import User from '../models/user/user';
import Group from "../models/group/group";

export function getUsers(req, res, next) {
    const { skip, limit, searchBy} = req.query;

    if (searchBy) {
        User.find({'$or': [
                {username: {$regex: searchBy}},
                {firstName: {$regex: searchBy}},
                {lastName: {$regex: searchBy}},
                {email: {$regex: searchBy}}
            ]}, null, {skip: Number(skip), limit: Number(limit)})
            .then(docs => res.json(docs))
            .catch(next)
    } else {
        User.find({}, null, {skip: Number(skip), limit: Number(limit)})
            .then(users => res.json(users))
            .catch(next);
    }
}

export function getUserByID(req, res, next) {
    async.waterfall([
        function(callback) {
            User.findOne({_id: req.params.id})
                .then(user => {
                    if (!user) return next(createError('Not Found', 404));
                    callback(null, user)
                })
                .catch(next)
        },
        function(user, callback) {
            Group.find({users: user.id})
                .then(groups => callback(user, groups))
                .catch(next)
        }
    ], function (user, groups) {
        return res.json({
            user,
            groups
        });
    });
}

export function createUser(req, res, next) {
    User.create(req.body)
        .then(newUser => res.status(201).json(newUser))
        .catch(next)
}

export function addUserInGroup(req, res, next) {
    const {userID, groupID} = req.params;

    async.waterfall([
        function(callback) {
            User.findOne({_id: userID})
                .then(user => {
                    if (!user) return next(createError('User not Found', 404));
                    callback(null, user)
                })
                .catch(next)
        },
        function(user, callback) {
            Group.findOneAndUpdate({_id: groupID}, { $push: { users: user._id } }, {new: true})
                .then(addedUser => {
                    if (!addedUser) return next(createError('Group not Found', 404));
                    callback(addedUser);
                })
                .catch(next)
        }
    ], function (addedUser) {
        return res.json(addedUser);
    });
}

export function updateUser(req, res, next) {
    User.findOne({_id: req.params.id})
        .then(user => {
            user.set(req.body);
            user.save()
                .then(updatedUser => res.json(updatedUser))
                .catch(next);
        })
        .catch(next);
}

export function removeFromGroup(req, res, next) {
    const {groupID} = req.body.id;

    Group.findOneAndUpdate({_id: groupID}, {$pull: {users: req.params.id}}, {new: true})
        .then(modification => res.json(modification))
        .catch(next);
}

export function removeUser(req, res, next) {
    User.findOneAndRemove({_id: req.params.id})
        .then(user => {
            if (!user) return next(createError('User already deleted', 410));
            Group.update({}, {$pull: {users: user.id}}, {multi: true})
                .then(modification => res.json(modification))
                .catch(next);
        })
        .catch(next)
}