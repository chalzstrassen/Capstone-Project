Enwritt.Collections.Books = Backbone.Collection.extend({
  url: "/api/books",
  model: Enwritt.Models.Book,

  getOrFetch: function (id) {
    var book = this.model.get(id)
    if (book) {
      book.fetch();
    } else {
      book = new Enwritt.Models.Book({id: id});
      book.fetch();
    }

    return book;
  }

});
