import async from 'async';
import createError from './createError';
import User from '../models/user';
import Group from '../models/group';

class CommonCrudOperations {

    getAll({Model, ModelPopulate, pathPopulate, searchFields}) {
        return (req, done) => {
            const { skip, limit, searchBy } = req.query;

            async.waterfall([
                    next => {
                        Model.find({'$or': getSearchFields(searchBy, searchFields)}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                            if (err) return done(err);
                            next(null, data)
                        });
                    },
                    (data, next) => {
                        ModelPopulate.populate(data, {path: pathPopulate}, (err, docs) => {
                            if (err) return done(err);
                            next(docs)
                        })
                    }
                ], (docs) => done(null, docs)
            )
        }
    };

    getByID({Model, ModelPopulate, pathPopulate, searchFields}) {
        return (req, done) => {
            const {skip, limit, searchBy} = req.query;

            async.waterfall([
                    next => {
                        Model.findOne({_id: req.params.id}, (err, data) => {
                            if (!data) return done(createError('Not found!', 404));
                            if (err) return done(err);
                            next(null, data)
                        });
                    },
                    (data, next) => {
                        ModelPopulate.populate(data,
                            {
                                path: pathPopulate,
                                match: {'$or': getSearchFields(searchBy, searchFields)},
                                options: {skip: Number(skip), limit: Number(limit)}
                            },
                            (err, docs) => {
                                if (err) return done(err);
                                next(docs);
                            });
                    }
                ], (docs) => done(null, docs)
            )
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

    update({Model, ModelPopulate, pathPopulate}) {
        return (req, done) => {

            async.waterfall([
                    next => {
                        Model.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) => {
                            if (err) return done(err);
                            if (!data) return done(createError('Not found!', 404));
                            next(null, data)
                        });
                    },
                    (data, next) => {
                        ModelPopulate.populate(data, {path: pathPopulate}, (err, docs) => {
                            if (err) return done(err);
                            next(docs);
                        })
                    }
                ], (docs) => done(null, docs)
            );

        }
    };

    remove({Model, ModelUpdate, pathUpdate}) {
        return (req, done) => {

            async.waterfall([
                    next => {
                        Model.findOneAndRemove({_id: req.params.id}, (err, data) => {
                            if (!data) return done(createError('Not found!', 404));
                            if (err) return done(err);
                            next(null, data);
                        });
                    },
                    (data, next) => {
                        ModelUpdate.update({}, {$pull: {[pathUpdate]: data.id}}, {multi: true}, (err, modification) => {
                            if (err) return done(err);
                            next(data);
                        })
                    }
                ], (data) => done(null, data)
            );
        }
    };

    addUserInGroup() {
        return (req, done) => {
            const {userID, groupID} = req.body;

            async.waterfall([
                    next => {
                        Group.findOneAndUpdate({_id: groupID}, { $addToSet: { users: userID } }, {new: true}, (err, group) => {
                            if (err) return done(err);
                            if (!group) return done(createError('Group is not found', 404));
                            next(null, group);
                        });
                    },
                    (group, next) => {
                        Group.populate(group, {path: 'groups'}, (err, updatedGroup) => {
                            if (err) return done(err);
                            next(null, updatedGroup);
                        })
                    },
                    (updatedGroup, next) => {
                        User.findOneAndUpdate({_id: userID}, { $addToSet: { groups: groupID } }, {new: true}, (err, user) => {
                            if (err) return done(err);
                            if (!user) return done(createError('User is not found', 404));
                            next(null, updatedGroup, user)
                        });
                    },
                    (updatedGroup, user, next) => {
                        User.populate(user, {path: 'users'}, (err, updatedUser) => {
                            if (err) return done(err);
                            next(updatedGroup, updatedUser);
                        })
                    }
                ], (group, user) => done(null, {group, user})
            );
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
                            if (!user) return done(createError('User is not found', 404));
                            next(null, user);
                        });
                    },
                    (user, next) => {
                        Group.populate(user, {path: 'groups'}, (err, updatedUser) => {
                            if (err) return done(err);
                            next(null, updatedUser);
                        })
                    },
                    (updatedUser, next) => {
                        Group.findOneAndUpdate({_id: groupID}, {$pull: {users: userID}}, {new: true}, (err, group) => {
                            if (err) return done(err);
                            if (!group) return done(createError('Group is not found', 404));
                            next(null, updatedUser, group)
                        });
                    },
                    (updatedUser, group, next) => {
                        User.populate(group, {path: 'users'}, (err, updatedGroup) => {
                            if (err) return done(err);
                            next(updatedUser, updatedGroup);
                        })
                    },
                ], (user, group) => done(null, {user, group})
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
