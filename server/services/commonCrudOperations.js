import createError from './error';

export class CommonCrudOperations {

    getAll = (Model, ModelPopulate) => (
        (req, res, done) => {
            const { skip, limit, searchBy } = req.query;

            if (searchBy) {
                Model.find({'$or': searchFields(searchBy, ModelPopulate)}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                    if (err) return done(err);
                    return (
                        !ModelPopulate ?
                            res.json(data) :
                            ModelPopulate.populate(data, {path: 'users'}, (err, docs) => {
                                if (err) return done(err);
                                res.json(docs);
                            })
                    );
                });
            } else {
                Model.find({}, null, {skip: Number(skip), limit: Number(limit)}, (err, data) => {
                    if (err) return done(err);

                    return (
                        !ModelPopulate ?
                            res.json(data) :
                            ModelPopulate.populate(data, {path: 'users'}, (err, docs) => {
                                if (err) return done(err);
                                res.json(docs);
                            })
                    );
                });
            }
        }
    );

    create = (Model) => (
        (req, res, done) => {
            Model.create(req.body, (err, data) => {
                if (err) return done(err);
                res.status(201).json(data);
            });
        }
    );

    update = (Model, ModelPopulate) => (
        (req, res, done) => {
            Model.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) => {
                if (err) return done(err);

                return (
                    !ModelPopulate ?
                        res.json(data) :
                        ModelPopulate.populate(data, {path: 'users'}, (err, docs) => {
                            if (err) return done(err);
                            res.json(docs);
                        })
                );
            });
        }
    );

    remove = (Model, ModelPopulate) => (
        (req, res, done) => {
            Model.findOneAndRemove({_id: req.params.id}, (err, data) => {
                if (!data) return done(createError('Is not exist', 404));
                if (err) return done(err);
                const message = 'Successfully deleted';

                return (
                    !ModelPopulate ?
                        res.status(200).json(message) :
                        ModelPopulate.update({}, {$pull: {users: data.id}}, {multi: true}, (err, modification) => {
                            if (err) return done(err);
                            res.status(200).json(message);
                        })
                );
            });
        }
    );

    removeFromGroup = (Model, ModelPopulate) => (
        (req, res, done) => {
            const userID = req.body.userID || req.params.id;
            const groupID = req.body.groupID || req.params.id;

            Model.findOneAndUpdate({_id: groupID}, {$pull: {users: userID}}, {new: true}, (err, data) => {
                if (err) return done(err);
                return (
                    !ModelPopulate ?
                        res.json(data) :
                        ModelPopulate.populate(data, {path: 'users'}, (err, docs) => {
                            if (err) return done(err);
                            res.json(docs);
                        })
                );
            });
        }
    );
}

function searchFields(searchBy, ModelPopulate) {
    return (
        ModelPopulate ?
            [
                {name: {$regex: searchBy, $options: 'i'}},
                {title: {$regex: searchBy, $options: 'i'}}
            ] :
            [
                {username: {$regex: searchBy, $options: 'i'}},
                {firstName: {$regex: searchBy, $options: 'i'}},
                {lastName: {$regex: searchBy, $options: 'i'}},
                {email: {$regex: searchBy, $options: 'i'}}
            ]
    );
}
