export function handleChangeState(event) {
    const {value, name} = event.target;

    this.setState({
        [name]: value
    });
}

export function showForms(id) {
    this.setState({
        id,
        showForm: true
    });
}

export function getValidOptions(state) {
    const options = {};
    for (const prop in state) {
        if (state[prop]) {
            options[prop] = state[prop];
        }
    }
    return options;
}
