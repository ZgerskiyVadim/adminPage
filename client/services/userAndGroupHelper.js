export function onChangeForm(event) {
    const {value, name} = event.target;
    this.setState({
        [name]: value
    });
}

export function showForms(id) {
    this.setState({
        id,
        show: true
    })
}

export function getOptions(state) {
    const options = {};
    for (const prop in state) {
        if (state[prop]) {
            options[prop] = state[prop];
        }
    }
    return options;
}