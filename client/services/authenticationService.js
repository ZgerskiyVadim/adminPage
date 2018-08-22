import axios from 'axios';
import config from '../../config';
import redirectOnPage from './redirectOnPage';
import showToastrMessage from './showToastrMessage';
import localStorageOperations from './localStorageOperations';

class AuthenticationService {

    isHaveSessionCookie() {
        return getCookie(config.sessionName) && localStorageOperations.getItem('user');
    }

    logout() {
        axios.get('/auth/logout')
            .then(() =>  {
                localStorageOperations.remove('user');
                redirectOnPage.path('/');
            })
            .catch(error => showToastrMessage.error(error))
    }
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? !!decodeURIComponent(matches[1]) : undefined;
}

export default new AuthenticationService;