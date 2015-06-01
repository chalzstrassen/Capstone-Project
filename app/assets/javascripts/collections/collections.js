Enwritt.Collections.Collections = Backbone.Collection.extend({
  model: Enwritt.Models.Collection,
  url: "/api/collections",
  parse: function (resp) {
    this._page = resp._page;
    this._totalPages = resp._totalPages;

    return resp.paginated;
  },
  getOrFetch: function (id) {
    var collection = this.get(id);
    if (collection) {
      collection.fetch();
    } else {
      collection = Enwritt.Models.Collection({id: id});
      collection.fetch();
    }

    return collection;
  }
});
