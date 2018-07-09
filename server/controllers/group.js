import Group from "../models/group/group";
import User from "../models/user/user";

const getGroups = function (req, res, next) {
    Group.find({})
        .then(groups => {
            User.populate(groups, {path: 'users'})
                .then(docs => res.json(docs))
                .catch(next)
        })
        .catch(next)
};

const searchGroup = function (req, res, next) {
    Group.find({'$or': [
            {name: {$regex: req.body.query}},
            {title: {$regex: req.body.query}}
        ]})
        .then(docs => res.json(docs))
        .catch(next)
};

const createGroup = function (req, res, next) {
    const group = new Group({
        name: req.body.name,
        title: req.body.title
    });
    return group.save()
        .then(newGroup => res.status(201).json(newGroup))
        .catch(next)
};

const getGroupByID = function (req, res, next) {
    Group.findOne({_id: req.params.id})
        .then(group => {
            if (!group) {
                const error = new Error();
                error.message = 'Not Found';
                error.status = 404;
                return next(error);
            }
            return res.json(group);
        })
        .catch(next)
};

const updateGroup = function (req, res, next) {
    User.findOne({_id: req.params.id})
        .then(user => {
            user.set(req.body);
            user.save()
                .then(updatedUser => res.json(updatedUser))
                .catch(next);
        })
        .catch(next);
};

const removeUser = function (req, res, next) {
    const {userID} = req.body;

    Group.findOneAndUpdate({_id: req.params.id}, {$pull: {users: userID}}, {new: true})
        .then(modification => {
            return res.json({
                modification,
                status: 'OK'
            })
        })
        .catch(next);
};

const removeGroup = function (req, res, next) {
    Group.findOneAndRemove({_id: req.params.id})
        .then(modification => {
            if (!modification) {
                const error = new Error();
                error.message = 'Group already deleted';
                error.status = 410;
                return next(error);
            }
            return res.json({
                modification,
                status: 'OK'
            });
        })
        .catch(next)
};

export default {
    getGroups,
    searchGroup,
    createGroup,
    getGroupByID,
    updateGroup,
    removeUser,
    removeGroup
}