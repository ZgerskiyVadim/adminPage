import async from 'async';
import createError from '../services/error';
import User from '../models/user/user';
import Group from '../models/group/group';

export class CommonCrudOperations {

    getAll = (Model, ModelPopulate, path) => (
        (req, res, done) => {
            const { skip, limit, searchBy } = req.query;

            if (searchBy) {
                const fieldsBy = path === 'users' ? path : 'users';
                Model.find({'$or': searchFields(searchBy, fieldsBy)}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                    if (err) return done(err);
                    ModelPopulate.populate(data, {path}, (err, docs) => {
                        if (err) return done(err);
                        res.json(docs);
                    })
                });
            } else {
                Model.find({}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                    if (err) return done(err);
                    ModelPopulate.populate(data, {path}, (err, docs) => {
                        if (err) return done(err);
                        res.json(docs);
                    })
                });
            }
        }
    );

    getByID = (Model, ModelPopulate, pathPopulate) => (
        (req, res, done) => {
            const { skip, limit, searchBy } = req.query;

            Model.findOne({_id: req.params.id}, (err, user) => {
                if (!user) return done(createError('Not Found', 404));
                if (err) return done(err);
                ModelPopulate.populate(user,
                    {
                        path: pathPopulate,
                        match: {'$or': searchFields(searchBy, pathPopulate)},
                        options: {skip: Number(skip), limit: Number(limit)}
                    },
                    (err, docs) => {
                        if (err) return done(err);
                        res.json(docs);
                    });
            });
        }
    );

    create = (Model) => (
        (req, res, done) => {
            Model.create(req.body, (err, data) => {
                if (err) return done(err);
                res.status(201).json(data);
            });
        }
    );

    update = (Model, ModelPopulate, path) => (
        (req, res, done) => {
            Model.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) => {
                if (err) return done(err);
                ModelPopulate.populate(data, {path}, (err, docs) => {
                    if (err) return done(err);
                    res.json(docs);
                })
            });
        }
    );

    remove = (Model, ModelRemoveItem, path) => (
        (req, res, done) => {
            Model.findOneAndRemove({_id: req.params.id}, (err, data) => {
                if (!data) return done(createError('Is not exist', 404));
                if (err) return done(err);
                ModelRemoveItem.update({}, {$pull: {[path]: data.id}}, {multi: true}, (err, modification) => {
                    if (err) return done(err);
                    const message = 'Successfully deleted';
                    res.status(200).json(message);
                })
            });
        }
    );

    removeUserFromGroup = () => (
        (req, res, done) => {
            const userID = req.body.userID || req.params.id;
            const groupID = req.body.groupID || req.params.id;

            async.waterfall([
                    next => {
                        User.findOneAndUpdate({_id: userID}, {$pull: {groups: groupID}}, {new: true}, (err, user) => {
                            if (err) return done(err);
                            Group.populate(user, {path: 'groups'}, (err, updatedUser) => {
                                if (err) return done(err);
                                next(null, updatedUser);
                            })
                        });
                    },
                    (user, next) => {
                        Group.findOneAndUpdate({_id: groupID}, {$pull: {users: userID}}, {new: true}, (err, group) => {
                            if (err) return done(err);
                            User.populate(group, {path: 'users'}, (err, updatedGroup) => {
                                if (err) return done(err);
                                next(user, updatedGroup);
                            })
                        });
                    }
                ], (user, group) => res.json({user, group})
            );
        }
    );

    addUserInGroup = () => (
        (req, res, done) => {
            const {userID, groupID} = req.body;

            async.waterfall([
                    next => {
                        Group.findOneAndUpdate({_id: groupID}, { $push: { users: userID } }, {new: true}, (err, group) => {
                            if (!group) return done(createError('Group is not found', 404));
                            if (err) return done(err);
                            Group.populate(group, {path: 'groups'}, (err, updatedGroup) => {
                                if (err) return done(err);
                                next(null, updatedGroup);
                            })
                        });
                    },
                    (group, next) => {
                        User.findOneAndUpdate({_id: userID}, { $push: { groups: groupID } }, {new: true}, (err, user) => {
                            if (!user) return done(createError('User is not found', 404));
                            if (err) return done(err);
                            User.populate(user, {path: 'users'}, (err, updatedUser) => {
                                if (err) return done(err);
                                next(updatedUser, group);
                            })
                        });
                    }
                ], (user, group) => res.json({ user, group})
            );
        }
    );
}

function searchFields(searchBy, fieldsBy) {
    searchBy = searchBy ? searchBy : '';
    return (
        fieldsBy === 'groups' ?
            [
                {name: {$regex: searchBy, $options: 'i'}},
                {title: {$regex: searchBy, $options: 'i'}}
            ] :
            [
                {username: {$regex: searchBy, $options: 'i'}},
                {firstName: {$regex: searchBy, $options: 'i'}},
                {lastName: {$regex: searchBy, $options: 'i'}},
                {email: {$regex: searchBy, $options: 'i'}}
            ]
    );
}
