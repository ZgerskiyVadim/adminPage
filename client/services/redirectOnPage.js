import history from './history';

class RedirectOnPage {

    path(path) {
        history.push(path)
    }

    home() {
        history.push('/')
    }
}

export default new RedirectOnPage();