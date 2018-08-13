import toastrShowMessage from './toastrShowMessage';
import authenticationService from './authenticationService';

export function handleError(error) {
    const status = error && error.response && (error.response.status || error.response.data.status);

    error && toastrShowMessage.error(error);
    if (status === 401) {
        authenticationService.logout();
    }
}