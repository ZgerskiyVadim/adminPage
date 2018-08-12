import toastr from 'toastr';

class ToastrMessage {

    show(message) {
        toastr.success(message, 'Ok!');
    }

    error(error) {
        const message = error && error.response.data.message;
        const errmsg = error && error.response.data.errmsg;
        const errorMessage = error && (message || errmsg || error.message || error);
        const status = error && (error.response.data.status || error.response.status);

        if (status === 404) {
            toastr.error('Not found!', 'Opps!');
            return this.props.history.push('/');
        }

        error && toastr.error(errorMessage, 'Opps!');
    }

}

export default new ToastrMessage();