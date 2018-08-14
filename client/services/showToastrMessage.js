import toastr from "toastr";

class ShowToastrMessage {

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

    compareActions(previousProps, nextProps, message) {
        (previousProps.data._id !== nextProps.data._id) && this.info(message);
    }
}

export default new ShowToastrMessage();