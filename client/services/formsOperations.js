export function handleChangeForm(event, propState) {
    const {value, name} = event.target;

    propState ?

        this.setState({
            [propState]: {
                ...this.state[propState],
                [name]: value
            }
        }) :

        this.setState({
            [name]: value
        });
}

export function showForms(id) {
    this.setState({
        id,
        show: true
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
