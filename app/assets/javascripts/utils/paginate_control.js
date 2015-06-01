Enwritt.Mixins.Pagination = {
	prevPage: function (event) {
		event.preventDefault();
		var collection = this.collection;
		if (collection._page) {
			if (collection._page > 1) {
				collection._page -= 1;
				collection.fetch({
					data: {page: collection._page}
				});
			}
		}

	},
	nextPage: function (event) {
		event.preventDefault();
		var collection = this.collection;
		if (collection._page && collection._totalPages) {
			if (collection._page < collection._totalPages) {
				collection._page += 1;
				collection.fetch({
					data: {page: collection._page}
				});
			}
		}
	}
}