Enwritt.Collections.AuthBooks = Backbone.Collection.extend({
  model: Enwritt.Models.Book,
  url: '/api/authbooks',
  parse: function (resp) {
    this._page = resp._page;
    this._totalPages = resp._totalPages;
    this._ajaxLinks = resp._ajaxLinks;

    return resp.paginated;
  }
})