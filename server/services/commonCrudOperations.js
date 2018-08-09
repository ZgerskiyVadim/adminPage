import async from 'async';
import createError from './createError';
import User from '../models/user';
import Group from '../models/group';

class CommonCrudOperations {

    getAll({Model, ModelPopulateOrUpdate, pathPopulate, searchFields}) {
        return (req, done) => {
            const { skip, limit, searchBy } = req.query;

            if (searchBy) {
                Model.find({'$or': getSearchFields(searchBy, searchFields)}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                    if (err) return done(err);
                    ModelPopulateOrUpdate.populate(data, {path: pathPopulate}, (err, docs) => {
                        if (err) return done(err);
                        done(null, docs);
                    })
                });
            } else {
                Model.find({}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                    if (err) return done(err);
                    ModelPopulateOrUpdate.populate(data, {path: pathPopulate}, (err, docs) => {
                        if (err) return done(err);
                        done(null, docs);
                    })
                });
            }
        }
    };

    getByID({Model, ModelPopulateOrUpdate, pathPopulate, searchFields}) {
        return (req, done) => {
            const {skip, limit, searchBy} = req.query;

            Model.findOne({_id: req.params.id}, (err, user) => {
                if (!user) return done(createError('Not found!', 404));
                if (err) return done(err);
                ModelPopulateOrUpdate.populate(user,
                    {
                        path: pathPopulate,
                        match: {'$or': getSearchFields(searchBy, searchFields)},
                        options: {skip: Number(skip), limit: Number(limit)}
                    },
                    (err, docs) => {
                        if (err) return done(err);
                        done(null, docs);
                    });
            });
        }
    };

    create(Model) {
        return (req, done) => {
            Model.create(req.body, (err, data) => {
                if (err) return done(err);
                done(null, data, 201);
            });
        }
    };

    update({Model, ModelPopulateOrUpdate, pathPopulate}) {
        return (req, done) => {
            Model.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) => {
                if (err) return done(err);
                ModelPopulateOrUpdate.populate(data, {path: pathPopulate}, (err, docs) => {
                    if (err) return done(err);
                    done(null, docs);
                })
            });
        }
    };

    remove({Model, ModelPopulateOrUpdate, pathPopulate}) {
        return (req, done) => {
            Model.findOneAndRemove({_id: req.params.id}, (err, data) => {
                if (!data) return done(createError('Is not exist', 404));
                if (err) return done(err);
                ModelPopulateOrUpdate.update({}, {$pull: {[pathPopulate]: data.id}}, {multi: true}, (err, modification) => {
                    if (err) return done(err);
                    const message = 'Successfully deleted';
                    done(null, message, 200);
                })
            });
        }
    };

    removeUserFromGroup() {
        return (req, done) => {
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
                ], (user, group) => done(null, {user, group})
            );
        }
    };

    addUserInGroup() {
        return (req, done) => {
            const {userID, groupID} = req.body;

            async.waterfall([
                    next => {
                        Group.findOneAndUpdate({_id: groupID}, { $addToSet: { users: userID } }, {new: true}, (err, group) => {
                            if (!group) return done(createError('Group is not found', 404));
                            if (err) return done(err);
                            Group.populate(group, {path: 'groups'}, (err, updatedGroup) => {
                                if (err) return done(err);
                                next(null, updatedGroup);
                            })
                        });
                    },
                    (group, next) => {
                        User.findOneAndUpdate({_id: userID}, { $addToSet: { groups: groupID } }, {new: true}, (err, user) => {
                            if (!user) return done(createError('User is not found', 404));
                            if (err) return done(err);
                            User.populate(user, {path: 'users'}, (err, updatedUser) => {
                                if (err) return done(err);
                                next(updatedUser, group);
                            })
                        });
                    }
                ], (user, group) => done(null, { user, group})
            );
        }
    };
}

export default new CommonCrudOperations();

function getSearchFields(searchBy, fieldsBy) {
    searchBy = searchBy ? searchBy : '';
    return (
        fieldsBy === 'groups' ?
            [
                {name: {$regex: searchBy, $options: 'i'}},
                {title: {$regex: searchBy, $options: 'i'}}
            ] :
            fieldsBy === 'users' ?
                [
                    {username: {$regex: searchBy, $options: 'i'}},
                    {firstName: {$regex: searchBy, $options: 'i'}},
                    {lastName: {$regex: searchBy, $options: 'i'}},
                    {email: {$regex: searchBy, $options: 'i'}}
                ] :
                null
    );
}
