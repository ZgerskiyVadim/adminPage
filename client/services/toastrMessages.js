import toastr from 'toastr';

class ToastrMessage {

    showMessage(message) {
        toastr.success(message, 'Ok!');
    }

    showError(error) {
        const message = error && error.response && error.response.data.message;
        const errmsg = error && error.response && error.response.data.errmsg;
        const errorMessage = error && (message || errmsg || error.message || error);

        error && toastr.error(errorMessage, 'Oops!');
    }

}

export default new ToastrMessage();