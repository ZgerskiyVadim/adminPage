class FormsOperations {

    handleChange(event) {
        const {value, name} = event.target;

        this.setState({
            [name]: value
        });
    }

    getValidOptions(state) {
        const options = {};
        for (const prop in state) {
            state[prop] ? options[prop] = state[prop] : null
        }
        return options;
    }
}

export default new FormsOperations();
