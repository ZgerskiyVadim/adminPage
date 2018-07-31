export function getErrorMessage(props) {
    const {error} = props;
    const message = error && error.response.data.message;
    const errmsg = error && error.response.data.errmsg;

    return error && (message || errmsg || error.message);
}