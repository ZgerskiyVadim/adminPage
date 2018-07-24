import createError from '../services/error';
import Group from "../models/group/group";
import User from "../models/user/user";

export function getGroups(req, res, done) {
    const { skip, limit, searchBy } = req.query;

    if (searchBy) {
        Group.find({'$or': [
                {name: {$regex: searchBy, $options:'i'}},
                {title: {$regex: searchBy, $options:'i'}}
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
        User.populate(group, {path: 'users'}, (err, docs) => {
            if (err) return done(err);
            res.json(docs);
        });
    })
}

export function updateGroup(req, res, done) {
    Group.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, updatedGroup) => {
        if(err) return done(err);
        res.json(updatedGroup);
    })
}

export function removeUser(req, res, done) {
    const {userID} = req.body;
    const groupID = req.params.id;

    Group.findOneAndUpdate({_id: groupID}, {$pull: {users: userID}}, {new: true}, (err, group) => {
        if(err) return done(err);
        User.populate(group, {path: 'users'}, (err, docs) => {
            if (err) return done(err);
            res.json(docs);
        });
    })
}

export function removeGroup(req, res, done) {
    Group.findOneAndRemove({_id: req.params.id}, (err, group) => {
        if (!group) return done(createError('Group is not exist', 404));
        if(err) return done(err);
        const message = 'Group successfully deleted';
        res.status(200).json(message);
    })
}