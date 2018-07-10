export default function createError(message, status) {
    const error = new Error();
    error.message = message || '';
    status ? error.status = status : null;
    return error;
}