export function handleChangeState(event) {
    const {value, name} = event.target;

    this.setState({
        [name]: value
    });
}

export function showForms(id, event) {
    event.stopPropagation();
    this.setState({
        id,
        showForm: true
    });
}

export function getValidOptions(state) {
    const options = {};
    for (const prop in state) {
        state[prop] ? options[prop] = state[prop] : null
    }
    return options;
}
