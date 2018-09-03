class SearchOperation {

    getItems(event, getItemsRequest) {
        const {value} = event.target;

        this.setState({
                options: {
                    ...this.state.options,
                    limit: 20,
                    searchBy: value
                },
                isLoadMore: true
            },
            () => getItemsRequest(this.state.options)
        );
    }
}

export default new SearchOperation();