const scrollMinHeight = 250;

export function loadMore(enumItem) {
    const lengthOfItems = enumItem === 'users' ? this.props.users.length : this.props.groups.length;
    const {isLoadMore} = this.state;

    if (isLoadMore && ((scrollHeight() <= scrollMinHeight) || isScrollDown())) {
        setState.call(this, lengthOfItems, enumItem);
    }
}

export function checkRemovedItems(prevCount, currentCount) {
    if (currentCount < prevCount) {
        this.setState({
            options: {
                ...this.state.options,
                limit: currentCount
            }
        }, () => {
            this.loadMore();
        });
    }
}

function scrollHeight() {
    return document.documentElement.scrollHeight - document.documentElement.clientHeight;
}

function isScrollDown() {
    return window.scrollY === scrollHeight();
}

function setState(lengthOfItems, enumItem) {
    const {limit, loadNext} = this.state.options;

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
        }, () => requestGetItems.call(this, enumItem));
    }
}

function requestGetItems(enumItem) {
    const {isSearching, options} = this.state;
    const {limit} = options;

    if (enumItem === 'users') {
        const {searchUsersRequest, getUsersRequest} = this.props.actions;
        isSearching ? searchUsersRequest(options) : getUsersRequest(limit);
    } else {
        const {searchGroupsRequest, getGroupsRequest} = this.props.actions;
        isSearching ? searchGroupsRequest(options) : getGroupsRequest(limit);
    }
}
