import createError from './createError';

export default function isAuthenticated(req, res, done) {
    const message = 'Authenticated failed';
    req.isAuthenticated() ? done() : done(createError(message));
}