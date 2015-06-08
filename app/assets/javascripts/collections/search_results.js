Enwritt.Collections.SearchResults = Backbone.Collection.extend({
	url: 'api/user_searches',
	model: Enwritt.Models.Book,
	parse: function (resp) {
		this._page = resp._page;
		delete resp._page;
		return resp.paginated;
	}
});