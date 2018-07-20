export function loadMore(enumItem) {
    const lengthOfItems = enumItem === 'users' ? this.props.stateStore.usersReducer.length : this.props.stateStore.groupsReducer.length;
    if (this.state.isLoadMore && (window.scrollY === (window.document.body.scrollHeight - window.innerHeight))) {
        if (this.state.options.limit > lengthOfItems) {
            this.setState({
                isLoadMore: false
            })
        } else {
            this.setState({
                options: {
                    ...this.state.options,
                    limit: this.state.options.limit + this.state.options.loadNext
                }
            });
            if (enumItem === 'users') {
                this.state.isSearching ? this.props.search(this.state.options) : this.props.getUsers(this.state.options.limit)
            } else {
                this.state.isSearching ? this.props.search(this.state.options) : this.props.getGroups(this.state.options.limit)
            }
        }
    }
}

export function setOptions(event) {
    this.setState({
        options: {
            ...this.state.options,
            limit: 20,
            searchBy: event.target.value
        },
        isSearching: !!event.target.value,
        isLoadMore: true
    });
    return {
        limit: 20,
        searchBy: event.target.value
    }
}