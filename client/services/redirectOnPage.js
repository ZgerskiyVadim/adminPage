import history from './history';

class RedirectOnPage {

    path(path) {
        history.push(path)
    }
}

export default new RedirectOnPage();