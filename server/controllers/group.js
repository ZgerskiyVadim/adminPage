import async from 'async';
import waterfall from 'async/waterfall';
import Group from "../models/group/group";
import User from "../models/user/user";

const getGroups = function (req, res, next) {
    Group.find({}, function (err, groups) {
        if (err) return next(err);
        return res.json(groups);
    });
};

const createGroup = function (req, res, next) {
    const group = new Group({
        name: req.body.name,
        title: req.body.title
    });
    return group.save(function (err, newGroup) {
        if (err) return next(err);
        return res.status(201).json(newGroup);

    });
};

const getGroupByName = function (req, res, next) {
    Group.findOne({name: req.params.name}, function (err, group) {
        if (err) return next(err);
        if (!group) {
            const error = new Error();
            error.message = 'Not Found';
            error.status = 404;
            return next(error);
        }
        return res.json(group);
    })
};

const updateGroup = function (req, res, next) {
    Group.findOneAndUpdate({name: req.params.name}, {
        $set: {
            name: req.body.name,
            title: req.body.title
        }
    }, {new: true}, function (err, modification) {
        if (err) return next(err);
        return res.json({group: modification});
    });
};

const addUserInGroup = function (req, res, next) {
    const {username, name} = req.params;

        async.waterfall([
            function(next) {
                User.findOne({username}).exec(next);
            },
            function(user, next) {
                Group.findOne({name}).exec(function (err, modification) {
                    next(err, modification);
                });
            }
        ], function (err, modification) {
            if (err) return next(err);
            res.json(modification);
        });

    // Group.findOneAndUpdate({name}, {
    //     $push: { users: user }
    // }, {new: true}, function (err, modification) {
    //     if (err) {
    //         return next(err);
    //     }
    //     return res.json({group: modification});
    // });
};

const removeGroup = function (req, res, next) {
    Group.findOneAndRemove({name: req.params.name}, function (err, modification) {
        if (err) return next(err);

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
};

export default {
    getGroups,
    createGroup,
    getGroupByName,
    updateGroup,
    addUserInGroup,
    removeGroup
}