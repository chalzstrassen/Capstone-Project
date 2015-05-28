Enwritt.Mixins.Pagination = {
	shiftPage: function (collection, page) {
		collection.fetch({
			data: {page: page}
		});
	}
}