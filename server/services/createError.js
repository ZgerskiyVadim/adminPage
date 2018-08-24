export default function createError(message, status) {
    const error = new Error();
    error.message = message || 'Server Error';
    error.status = status ? status : 500;
    return error;
}
