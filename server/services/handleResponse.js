export const handleResponse = (controller) => (
    (req, res, done) => {
        controller(req, (err, data, statusCode) => {
            if (err) return done(err);
            statusCode ?
                res.status(statusCode).json(data) :
                res.json(data);
        })
    }
);