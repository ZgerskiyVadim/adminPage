import User from '../models/user/user';

const getUsers = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        return res.json(users);
    });
};

const createUser = function (req, res, next) {
    const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    return user.save(function (err, newUser) {
        if (err) return next(err);
        return res.status(201).json(newUser);

    });
};

const getUserByUsername = function (req, res, next) {
    User.findOne({username: req.params.username}, function (err, user) {
        if (err) return next(err);

        if (!user) {
            const error = new Error();
            error.message = 'Not Found';
            error.status = 404;
            return next(error);
        }
        return res.json(user);
    })
};

const updateUser = function (req, res, next) {
    User.findOneAndUpdate({username: req.params.username}, {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
    }, {new: true}, function (err, modification) {
        if (err) return next(err);
        return res.json({user: modification});
    });
};

const removeUser = function (req, res, next) {
    User.findOneAndRemove({username: req.params.username}, function (err, modification) {
        if (err) return next(err);

        if (!modification) {
            const error = new Error();
            error.message = 'User already deleted';
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
    getUsers,
    createUser,
    getUserByUsername,
    updateUser,
    removeUser
}