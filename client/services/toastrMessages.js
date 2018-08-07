import toastr from 'toastr';

export function toastrMessages(props) {
    const {
        error,
        isUserCreated,
        isGroupCreated,
        isJoinedGroup,
        isLeftGroup,
        isUpdated,
        isRemoved
    } = props;
    const message = error && error.response.data.message;
    const errmsg = error && error.response.data.errmsg;
    const errorMessage = error && (message || errmsg || error.message);

    const status = error && (error.response.data.status || error.response.status);
    if (status === 404) {
        toastr.error('Not found!', 'Opps!');
        return this.props.history.push('/');
    }

    error && toastr.error(errorMessage, 'Opps!');
    isUserCreated && toastr.info('User created', 'Ok!');
    isGroupCreated && toastr.info('Group created', 'Ok!');
    isJoinedGroup && toastr.success('User joined group', 'Ok!');
    isLeftGroup && toastr.info('User left group', 'Ok!');
    isUpdated && toastr.success('Is updated', 'Ok!');
    isRemoved && toastr.info('Is removed', 'Ok!');
}