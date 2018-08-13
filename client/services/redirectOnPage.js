import { createHashHistory } from 'history';
const history = createHashHistory();

class RedirectOnPage {

    home() {
        history.push('/')
    }
}

export default new RedirectOnPage();