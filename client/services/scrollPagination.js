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
                const {searchBy, limit, id} = this.state.options;
                const options = id ? {searchBy, limit, id}: {searchBy, limit};
                getItemsRequest(options)
            });
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
