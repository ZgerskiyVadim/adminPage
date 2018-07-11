export function errorHandler(err, req, res, done) {
    err.message = err.message || 'Server Error';
    err.status = err.status || 500;
    return res.status(err.status).json(err);
}