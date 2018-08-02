
export function searchUsersRequest(event) {
    const {value} = event.target;
    setStateUsersOrGroups.call(this, value, 'users')
}

export function searchGroupsRequest(event) {
    const {value} = event.target;
    setStateUsersOrGroups.call(this, value, 'groups')
}

export function searchUserRequest(event) {
    const {value} = event.target;
    setStateUserOrGroup.call(this, value, 'user')
}

export function searchGroupRequest(event) {
    const {value} = event.target;
    setStateUserOrGroup.call(this, value, 'group')
}

function setStateUsersOrGroups(value, enumItems) {
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

function setStateUserOrGroup(value, enumItems) {
    this.setState({
            options: {
                ...this.state.options,
                limit: 20,
                searchBy: value
            }
        },
        () => enumItems === 'user' ?
            this.props.actions.getUserRequest(this.state.options) :
            this.props.actions.getGroupRequest(this.state.options)
    );
}