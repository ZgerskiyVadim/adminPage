import createError from '../libs/error';
import Group from "../models/group/group";
import User from "../models/user/user";

export function getGroups(req, res, next) {
    const { skip, limit } = req.query;

    Group.find({}, null, {skip: Number(skip), limit: Number(limit)})
        .then(groups => {
            User.populate(groups, {path: 'users'})
                .then(docs => res.json(docs))
                .catch(next)
        })
        .catch(next)
}

export function searchGroup(req, res, next) {
    Group.find({'$or': [
            {name: {$regex: req.body.query}},
            {title: {$regex: req.body.query}}
        ]})
        .then(docs => res.json(docs))
        .catch(next)
}

export function createGroup(req, res, next) {
    const group = new Group({
        name: req.body.name,
        title: req.body.title
    });
    return group.save()
        .then(newGroup => res.status(201).json(newGroup))
        .catch(next)
}

export function getGroupByID(req, res, next) {
    Group.findOne({_id: req.params.id})
        .then(group => {
            if (!group) return next(createError('Not Found', 404));
            return res.json(group);
        })
        .catch(next)
}

export function updateGroup(req, res, next) {
    User.findOne({_id: req.params.id})
        .then(user => {
            user.set(req.body);
            user.save()
                .then(updatedUser => res.json(updatedUser))
                .catch(next);
        })
        .catch(next);
}

export function removeUser(req, res, next) {
    const {userID} = req.body;

    Group.findOneAndUpdate({_id: req.params.id}, {$pull: {users: userID}}, {new: true})
        .then(modification => res.json(modification))
        .catch(next);
}

export function removeGroup(req, res, next) {
    Group.findOneAndRemove({_id: req.params.id})
        .then(modification => {
            if (!modification) return next(createError('Group already deleted', 410));
            return res.json(modification);
        })
        .catch(next)
}