
export function searchRequest(event, enumItems) {
    const {value} = event.target;

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
            this.props.actions.searchGroupsRequest(this.state.options) :
            this.props.actions.searchUsersRequest(this.state.options)
    );
}