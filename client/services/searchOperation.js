
export function searchRequest(event, enumItems) {
    const {value} = event.target;
    const {options} = this.state;

    this.setState({
            options: {
                ...this.state.options,
                limit: 20,
                searchBy: value
            },
            isSearching: !!value,
            isLoadMore: true
        },
        () => enumItems === 'groups' ?
            this.props.actions.searchGroupsRequest(options) :
            this.props.actions.searchUsersRequest(options)
    );
}