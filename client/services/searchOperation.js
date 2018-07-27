
export function searchRequest(event, enumItems) {
    this.setState({
            options: {
                ...this.state.options,
                limit: 20,
                searchBy: event.target.value
            },
            isSearching: !!event.target.value,
            isLoadMore: true
        },
        () => enumItems === 'groups' ?
            this.props.actions.searchGroupsRequest(this.state.options) :
            this.props.actions.searchUsersRequest(this.state.options)
    );
}