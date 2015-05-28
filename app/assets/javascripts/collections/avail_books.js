Enwritt.Collections.AvailBooks = Backbone.Collection.extend({
	model: Enwritt.Models.Book,
	url: "api/availbooks",
	parse: function (resp) {
	    this._page = resp._page;
	    this._ajaxLinks = resp._ajaxLinks;

	    return resp.paginated;
  	}
});