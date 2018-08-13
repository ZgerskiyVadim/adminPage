import createError from '../services/createError';

export default function isAuthenticated(req, res, done) {
    const message = 'Please login';
    req.isAuthenticated() ? done() : done(createError(message, 401));
}