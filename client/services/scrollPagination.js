class ScrollPagination {
    loadMore(lengthOfItems, getItemsRequest) {
        const {isLoadMore} = this.state;

        if (isLoadMore && scrollDown()) {
            getItems.call(this, lengthOfItems, getItemsRequest);
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

function getItems(lengthOfItems, getItemsRequest) {
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
        }, () => {
            const {searchBy, limit} = this.state.options;
            const options = {searchBy, limit};
            getItemsRequest(options)
        });
    }
}
