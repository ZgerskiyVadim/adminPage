import createError from '../libs/error';
import Group from "../models/group/group";
import User from "../models/user/user";

export function getGroups(req, res, done) {
    const { skip, limit, searchBy } = req.query;

    if (searchBy) {
        Group.find({'$or': [
                {name: {$regex: searchBy}},
                {title: {$regex: searchBy}}
            ]}, null, {skip: Number(skip), limit: Number(limit)}, (err, groups) => {
            if (err) return done(err);
            User.populate(groups, {path: 'users'}, (err, docs) => {
                if (err) return done(err);
                res.json(docs);
            })
        })
    } else {
        Group.find({}, null, {skip: Number(skip), limit: Number(limit)}, (err, groups) => {
            if (err) return done(err);
            User.populate(groups, {path: 'users'}, (err, docs) => {
                if (err) return done(err);
                res.json(docs);
            })
        })
    }
}

export function createGroup(req, res, done) {
    Group.create(req.body, (err, newGroup) => {
        if (err) return done(err);
        res.status(201).json(newGroup);
    })
}

export function getGroupByID(req, res, done) {
    Group.findOne({_id: req.params.id}, (err, group) => {
        if (!group) return done(createError('Not Found', 404));
        if (err) return done(err);
        res.json(group);
    })
}

export function updateGroup(req, res, done) {
    Group.updateOne({_id: req.params.id}, req.body, {runValidators: true}, (err, modification) => {
        if(err) return done(err);
        res.json(modification);
    })
}

export function removeUser(req, res, done) {
    const {userID} = req.body;

    Group.findOneAndUpdate({_id: req.params.id}, {$pull: {users: userID}}, {new: true}, (err, modification) => {
        if(err) return done(err);
        res.json(modification);
    })
}

export function removeGroup(req, res, done) {
    Group.findOneAndRemove({_id: req.params.id}, (err, modification) => {
        if (!modification) return done(createError('Group already deleted', 410));
        if(err) return done(err);
        res.json(modification);
    })
}