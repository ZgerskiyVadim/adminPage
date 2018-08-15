class ScrollPagination {
    loadMore(lengthOfItems, getItemsRequest) {
        const {limit, loadNext} = this.state.options;

        if (scrollDown() && canLoadMore(lengthOfItems, limit)) {
            this.setState({
                options: {
                    ...this.state.options,
                    limit: limit + loadNext
                }
            }, () => {
                const {searchBy, limit} = this.state.options;
                const options = {searchBy, limit};
                getItemsRequest(options)
            });
        }
    }

    checkRemovedItems(prevCount, currentCount) {
        if (currentCount < prevCount) {
            this.setState({
                options: {
                    ...this.state.options,
                    limit: currentCount
                }
            }, () => this.loadMore);
        }
    }
}

export default new ScrollPagination;

function scrollDown() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const positionOfScroll = window.scrollY;
    return Math.round(positionOfScroll) === scrollHeight;
}

function canLoadMore(lengthOfItems, limit) {
    return lengthOfItems >= limit
}
