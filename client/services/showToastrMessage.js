import toastr from "toastr";

class ShowToastrMessage {

    success(message, title) {
        toastr.success(message || 'Success', title || 'Ok!');
    }

    info(message, title) {
        toastr.info(message || 'Success', title || 'Ok!');
    }

    error(error, title) {
        const message = error && error.response && error.response.data.message;
        const errmsg = error && error.response && error.response.data.errmsg;
        const errorMessage = error && (message || errmsg || error.message || error);

        toastr.error(errorMessage || 'Something wrong', title || 'Oops!');
    }

}

export default new ShowToastrMessage();