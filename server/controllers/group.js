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

const createGroup = function (req, res, next) {
    const group = new Group({
        name: req.body.name,
        title: req.body.title
    });
    return group.save()
        .then(newGroup => res.status(201).json(newGroup))
        .catch(next)
};

const getGroupByName = function (req, res, next) {
    Group.findOne({name: req.params.name})
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
    Group.findOneAndUpdate({name: req.params.name}, {
        $set: {
            name: req.body.name,
            title: req.body.title
        }
    }, {new: true})
        .then(modification => res.json({group: modification}))
        .catch(next)
};

const removeGroup = function (req, res, next) {
    Group.findOneAndRemove({name: req.params.name})
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
    createGroup,
    getGroupByName,
    updateGroup,
    removeGroup
}