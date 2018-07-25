
export const create = (Model) => (
    (req, res, done) => {
        Model.create(req.body, (err, data) => {
            if (err) return done(err);
            res.status(201).json(data);
        })
    }
);

export const update = (Model) => (
    (req, res, done) => {
        Model.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) => {
            if(err) return done(err);
            res.json(data);
        })
    }
);