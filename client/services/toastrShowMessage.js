import toastr from "toastr";

class ToastrShowMessage {

    success(message, title) {
        toastr.success(message, title || 'Ok!');
    }

    info(message, title) {
        toastr.info(message, title || 'Ok!');
    }

    error(error, title) {
        const message = error && error.response && error.response.data.message;
        const errmsg = error && error.response && error.response.data.errmsg;
        const errorMessage = error && (message || errmsg || error.message || error);

        toastr.error(errorMessage, title || 'Oops!');
    }
}

export default new ToastrShowMessage();