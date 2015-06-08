Enwritt.Collections.AvailBooks = Backbone.Collection.extend({
	model: Enwritt.Models.Book,
	url: "api/availbooks",
	parse: function (resp) {
	    this._page = resp._page;
	    this._totalPages = resp._totalPages;

	    return resp.paginated;
  	}
});