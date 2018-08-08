import config from '../../config';
export default function isAuthenticated() {
    return getCookie(config.sessionName);
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? !!decodeURIComponent(matches[1]) : undefined;
}