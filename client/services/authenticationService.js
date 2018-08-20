import axios from 'axios';
import config from '../../config';
import redirectOnPage from './redirectOnPage';
import showToastrMessage from './showToastrMessage';

class AuthenticationService {

    isHaveSessionCookie() {
        return getCookie(config.sessionName);
    }

    login(options) {
        const {username, password} = options;
        axios.post('/auth/login', {username, password})
            .then(() => {
                redirectOnPage.path('/users');
                showToastrMessage.success('Successfully logged!');
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    showToastrMessage.error('Not found');
                } else {
                    showToastrMessage.error(error);
                }
            })
    }

    logout() {
        axios.get('/auth/logout')
            .then(() =>  redirectOnPage.path('/'))
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