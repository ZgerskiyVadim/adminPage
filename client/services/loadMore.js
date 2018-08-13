export function loadMore(enumItem) {
    const lengthOfItems = getLengthOfItems.call(this, enumItem);
    const {isLoadMore} = this.state;

    if (isLoadMore && isScrollDown()) {
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
        }, () => this.loadMore);
    }
}

function getLengthOfItems(enumItem) {
    if (enumItem === 'users' || enumItem === 'groups') {
        return enumItem === 'users' ? this.props.users.data.length : this.props.groups.data.length
    } else if (enumItem === 'user' || enumItem === 'group') {

        return enumItem === 'user' ? this.props.groups.length : this.props.users.length
    }
}

function isScrollDown() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const positionOfScroll = window.scrollY;
    return Math.round(positionOfScroll) === scrollHeight;
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
    if (enumItem === 'users' || enumItem === 'groups') {
        sendRequestUsersOrGroups.call(this, enumItem);
    } else if (enumItem === 'user' || enumItem === 'group') {
        sendRequestUserOrGroup.call(this, enumItem);
    }
}

function sendRequestUsersOrGroups(enumItem) {
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

function sendRequestUserOrGroup(enumItem) {
    const {options} = this.state;

    if (enumItem === 'user') {
        const {getUserRequest} = this.props.actions;
        getUserRequest(options);
    } else {
        const {getGroupRequest} = this.props.actions;
        getGroupRequest(options);
    }
}
