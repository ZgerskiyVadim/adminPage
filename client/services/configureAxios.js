import axios from 'axios';
import authenticationService from './authenticationService';

export function configureAxios() {
    axios.interceptors.response.use(null, (error) => {
        const errorMessage = error && error.response && error.response.data.message;
        if (error.response && error.response.status === 401 && errorMessage === 'Please login') {
            authenticationService.logout();
        }
        throw error;
    });
}