import async from 'async';
import createError from '../services/createError';
import User from '../models/user/index';
import Group from '../models/group/index';

export class CommonCrudOperations {

    getAll() {
        const {Model, pathPopulate, searchFields} = this.options;
        return (req, done) => {
            const { skip, limit, searchBy } = req.query;

            Model
                .find({'$or': getSearchFields(searchBy, searchFields)}, null, {skip: Number(skip), limit: Number(limit)})
                .populate(pathPopulate)
                .sort({date: -1})
                .exec((err, data) => err ? done(err) : done(null, data));
        }
    };

    getByID() {
        const {Model, pathPopulate} = this.options;
        const searchFields = pathPopulate;
        return (req, done) => {
            const {skip, limit, searchBy} = req.query;

            Model
                .findOne({_id: req.params.id})
                .populate({
                    path: pathPopulate,
                    match: {'$or': getSearchFields(searchBy, searchFields)},
                    options: {skip: Number(skip), limit: Number(limit)}
                })
                .exec((err, data) => {
                    if (!data) return done(createError('Not found!', 404));
                    if (err) return done(err);
                    done(null, data);
                });
        }
    };

    create() {
        const {Model} = this.options;
        return (req, done) => Model.create(req.body, (err, data) => err ? done(err) : done(null, data, 201));
    };

    update() {
        const {Model, pathPopulate} = this.options;
        return (req, done) => {

            Model.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
                .populate(pathPopulate)
                .exec((err, data) => {
                    if (!data) return done(createError('Not found!', 404));
                    if (err) return done(err);
                    done(null, data);
                });
        }
    };

    remove() {
        const {Model, ModelUpdate, pathUpdate} = this.optionsRemove;
        return (req, done) => {

            async.waterfall(
                [
                    next => {
                        Model.findOneAndRemove({_id: req.params.id}, (err, data) => {
                            if (!data) return done(createError('Not found!', 404));
                            next(err, data);
                        });
                    },
                    (data, next) => {
                        ModelUpdate.update({}, {$pull: {[pathUpdate]: data.id}}, {multi: true}, (err) => next(err, data))
                    }
                ],
                (err, data) => err ? done(err) : done(null, data)
            );
        }
    };

    addUserInGroup() {
        return (req, done) => {
            const {userID, groupID} = req.body;

            async.waterfall(
                [
                    next => {
                        Group
                            .findOneAndUpdate({_id: groupID}, { $addToSet: { users: userID } }, {new: true})
                            .populate('users')
                            .exec((err, group) => {
                                if (!group) return done(createError('Group is not found!', 404));
                                next(err, group);
                            });
                    },
                    (group, next) => {
                        User.findOneAndUpdate({_id: userID}, { $addToSet: { groups: groupID } }, {new: true})
                            .populate('groups')
                            .exec((err, user) => {
                                if (!user) return done(createError('User is not found!', 404));
                                next(err, user, group);
                            });
                    }
                ],
                (err, user, group) => err ? done(err) : done(null, {user, group})
            );
        }
    };

    removeUserFromGroup() {
        return (req, done) => {
            const userID = req.body.userID || req.params.id;
            const groupID = req.body.groupID || req.params.id;

            async.waterfall(
                [
                    next => {
                        Group
                            .findOneAndUpdate({_id: groupID}, {$pull: {users: userID}}, {new: true})
                            .populate('users')
                            .exec((err, group) => {
                                if (!group) return done(createError('Group is not found!', 404));
                                next(err, group);
                            });

                    },
                    (group, next) => {
                        User
                            .findOneAndUpdate({_id: userID}, {$pull: {groups: groupID}}, {new: true})
                            .populate('groups')
                            .exec((err, user) => {
                                if (!user) return done(createError('User is not found!', 404));
                                next(err, user, group);
                            });
                    }
                ],
                (err, user, group) => err ? done(err) : done(null, {user, group})
            );
        }
    };
}

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
