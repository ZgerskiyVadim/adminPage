import async from "async";
import User from '../models/user/user';
import Group from "../models/group/group";

const getUsers = function (req, res, next) {
    User.find({})
        .then(users => res.json(users))
        .catch(next)
};

const getUserByID = function (req, res, next) {
    async.waterfall([
        function(callback) {
            User.findOne({_id: req.params.id})
                .then(user => {
                    if (!user) {
                        const error = new Error();
                        error.message = 'Not Found';
                        error.status = 404;
                        return next(error);
                    }

                    callback(null, user)
                })
                .catch(next)
        },
        function(user, callback) {
            Group.find({users: user.id})
                .then(groups => {
                    if (!groups) {
                        const error = new Error();
                        error.message = 'Not Found';
                        error.status = 404;
                        return next(error);
                    }
                    callback(user, groups)
                })
                .catch(next)
        }
    ], function (user, groups) {
        return res.json({
            user,
            groups
        });
    });
};

const searchUser = function (req, res, next) {
    User.find({'$or': [
        {username: {$regex: req.body.query}},
        {firstName: {$regex: req.body.query}},
        {lastName: {$regex: req.body.query}},
        {email: {$regex: req.body.query}}
    ]})
        .then(docs => res.json(docs))
        .catch(next)
};

const createUser = function (req, res, next) {
    const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    return user.save()
        .then(newUser => res.status(201).json(newUser))
        .catch(next)
};

const addUserInGroup = function (req, res, next) {
    const {userID, groupID} = req.params;

    async.waterfall([
        function(callback) {
            User.findOne({_id: userID})
                .then(user => {
                    if (!user) {
                        const error = new Error();
                        error.message = 'User not Found';
                        error.status = 404;
                        return next(error);
                    }
                    callback(null, user)
                })
                .catch(next)
        },
        function(user, callback) {
            Group.findOneAndUpdate({_id: groupID}, { $push: { users: user._id } }, {new: true})
                .then(modification => {
                    if (!modification) {
                        const error = new Error();
                        error.message = 'Group not Found';
                        error.status = 404;
                        return next(error);
                    }
                    callback(modification);
                })
                .catch(next)
        }
    ], function (modification) {
        return res.json(modification);
    });
};

const updateUser = function (req, res, next) {
    User.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
    }, {new: true})
        .then(modification => res.json({user: modification}))
        .catch(next)
};

const removeUser = function (req, res, next) {
    User.findOneAndRemove({_id: req.params.id})
        .then(user => {
            if (!user) {
                const error = new Error();
                error.message = 'User already deleted';
                error.status = 410;
                return next(error);
            }
            Group.update({}, {$pull: {users: user.id}}, {multi: true})
                .then(modification => {
                    return res.json({
                        modification,
                        status: 'OK'
                    })
                })
                .catch(next);
        })
        .catch(next)
};

export default {
    getUsers,
    getUserByID,
    searchUser,
    createUser,
    addUserInGroup,
    updateUser,
    removeUser
}