const scrollMinHeight = 250;

export function loadMore(enumItem) {
    const lengthOfItems = enumItem === 'users' ? this.props.users.length : this.props.groups.length;

    if (this.state.isLoadMore && ((scrollHeight() <= scrollMinHeight) || isScrollDown())) {
        setState.call(this, lengthOfItems, enumItem);
    }
}

function scrollHeight() {
    return document.documentElement.scrollHeight - document.documentElement.clientHeight
}

function isScrollDown() {
    return window.scrollY === scrollHeight();
}

function setState(lengthOfItems, enumItem) {
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
        }, () => getItems.call(this, enumItem));
    }
}

function getItems (enumItem) {
    if (enumItem === 'users') {
        this.state.isSearching ? this.props.actions.searchUsersRequest(this.state.options) : this.props.actions.getUsersRequest(this.state.options.limit)
    } else {
        this.state.isSearching ? this.props.actions.searchGroupsRequest(this.state.options) : this.props.actions.getGroupsRequest(this.state.options.limit)
    }
}