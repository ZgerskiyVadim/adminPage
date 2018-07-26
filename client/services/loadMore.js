const scrollMinHeight = 250;

export function loadMore(enumItem) {
    const lengthOfItems = enumItem === 'users' ? this.props.users.length : this.props.groups.length;

    if (this.state.isLoadMore && ((scrollHeight() <= scrollMinHeight) || isScrollDown())) {
        setState.call(this, lengthOfItems, enumItem);
    }
}

export function checkRemovedItems(prevCountUsers, nextCountUsers) {
    if (nextCountUsers < prevCountUsers) {
        this.setState({
            options: {
                ...this.state.options,
                limit: nextCountUsers
            }
        }, () => {
            this.loadMore();
        })
    }
}

function scrollHeight() {
    return document.documentElement.scrollHeight - document.documentElement.clientHeight
}

function isScrollDown() {
    return window.scrollY === scrollHeight();
}

function setState(lengthOfItems, enumItem) {
    const limit = this.state.options.limit;
    const loadNext = this.state.options.loadNext;

    if (limit > lengthOfItems) {
        this.setState({
            isLoadMore: false
        })
    } else {
        this.setState({
            options: {
                ...this.state.options,
                limit: limit + loadNext
            }
        }, () => getItems.call(this, enumItem));
    }
}

function getItems (enumItem) {
    const isSearching = this.state.isSearching;

    if (enumItem === 'users') {
        isSearching ? this.props.actions.searchUsersRequest(this.state.options) : this.props.actions.getUsersRequest(this.state.options.limit)
    } else {
        isSearching ? this.props.actions.searchGroupsRequest(this.state.options) : this.props.actions.getGroupsRequest(this.state.options.limit)
    }
}